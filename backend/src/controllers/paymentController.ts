import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { paymentService } from '../services/paymentService';
import { courseService } from '../services/courseService';
import { verifyWebhookSignature } from '../utils/razorpay';
import { asyncHandler, AppError } from '../middlewares/errorHandler';
import logger from '../utils/logger';

export const paymentController = {
  // Create order for course enrollment
  createOrder: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.body;
    const userId = req.user!.id;

    if (!courseId) {
      throw new AppError('Course ID is required', 400);
    }

    // Check if course exists
    const course = await courseService.getCourseById(courseId);
    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Check if user is already enrolled
    const isEnrolled = await courseService.isUserEnrolled(userId, courseId);
    if (isEnrolled) {
      throw new AppError('Already enrolled in this course', 400);
    }

    // Create order
    const { order, razorpayOrder } = await paymentService.createOrder(
      userId,
      courseId,
      course.price
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  }),

  // Verify payment and enroll user
  verifyPayment: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user!.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new AppError('Payment details are required', 400);
    }

    try {
      // Verify payment
      const { order, payment } = await paymentService.verifyPayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      // Enroll user in course
      await courseService.enrollUser(userId, order.courseId, order.id);

      // Get course details including telegram link
      const course = await courseService.getCourseById(order.courseId);

      res.status(200).json({
        success: true,
        message: 'Payment verified and enrolled successfully',
        data: {
          course,
          telegramLink: course?.telegramLink,
        },
      });
    } catch (error: any) {
      logger.error('Payment verification failed:', error);
      throw new AppError(error.message || 'Payment verification failed', 400);
    }
  }),

  // Razorpay webhook handler
  handleWebhook: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers['x-razorpay-signature'] as string;

    if (!signature) {
      throw new AppError('Signature missing', 400);
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      JSON.stringify(req.body),
      signature,
      process.env.RAZORPAY_KEY_SECRET!
    );

    if (!isValid) {
      logger.error('Invalid webhook signature');
      throw new AppError('Invalid signature', 400);
    }

    const event = req.body.event;
    const payloadData = req.body.payload.payment.entity;

    logger.info('Webhook event received:', { event, payloadData });

    // Handle payment success
    if (event === 'payment.captured') {
      try {
        await paymentService.handleWebhookPayment({
          order_id: payloadData.order_id,
          payment_id: payloadData.id,
        });

        // Get order and enroll user
        const order = await paymentService.getOrderByRazorpayId(payloadData.order_id);
        if (order) {
          const isEnrolled = await courseService.isUserEnrolled(order.userId, order.courseId);
          if (!isEnrolled) {
            await courseService.enrollUser(order.userId, order.courseId, order.id);
          }
        }

        logger.info('Webhook processed successfully');
      } catch (error: any) {
        logger.error('Webhook processing failed:', error);
      }
    }

    res.status(200).json({ success: true });
  }),
};

// Validation middleware
export const validateCreateOrder = [
  body('courseId').isNumeric().withMessage('Course ID must be a number'),
];

export const validateVerifyPayment = [
  body('razorpay_order_id').notEmpty().withMessage('Order ID is required'),
  body('razorpay_payment_id').notEmpty().withMessage('Payment ID is required'),
  body('razorpay_signature').notEmpty().withMessage('Signature is required'),
];
