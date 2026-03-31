import Razorpay from 'razorpay';
import prisma from '../db/prisma';
import { verifyRazorpaySignature } from '../utils/razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const paymentService = {
  // Create Razorpay order
  async createOrder(userId: number, courseId: number, amount: number) {
    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    // Save order to database
    const order = await prisma.order.create({
      data: {
        userId,
        courseId,
        razorpayOrderId: razorpayOrder.id,
        amount,
        currency: 'INR',
        status: 'created',
      },
    });

    return {
      order,
      razorpayOrder,
    };
  },

  // Verify payment
  async verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string
  ) {
    const isValid = verifyRazorpaySignature(
      orderId,
      paymentId,
      signature,
      process.env.RAZORPAY_KEY_SECRET!
    );

    if (!isValid) {
      throw new Error('Invalid payment signature');
    }

    // Get order from database
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: orderId },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Save payment details and update order in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create payment
      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          razorpayPaymentId: paymentId,
          razorpaySignature: signature,
          status: 'success',
        },
      });

      // Update order status
      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: { status: 'paid' },
      });

      return { order: updatedOrder, payment };
    });

    return result;
  },

  // Get order by ID
  async getOrderById(orderId: number) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    return order;
  },

  // Get order by Razorpay order ID
  async getOrderByRazorpayId(razorpayOrderId: string) {
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId },
    });
    return order;
  },

  // Handle webhook payment success
  async handleWebhookPayment(paymentData: any) {
    const { order_id, payment_id } = paymentData;

    // Get order
    const order = await this.getOrderByRazorpayId(order_id);

    if (!order) {
      throw new Error('Order not found');
    }

    // Check if payment already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { razorpayPaymentId: payment_id },
    });

    if (existingPayment) {
      return existingPayment;
    }

    // Save payment and update order in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create payment
      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          razorpayPaymentId: payment_id,
          razorpaySignature: 'webhook',
          status: 'success',
        },
      });

      // Update order status
      await tx.order.update({
        where: { id: order.id },
        data: { status: 'paid' },
      });

      return payment;
    });

    return result;
  },
};