import crypto from 'crypto';

// Verify Razorpay signature
export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean => {
  try {
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    return generated_signature === signature;
  } catch (error) {
    return false;
  }
};

// Verify Razorpay webhook signature
export const verifyWebhookSignature = (
  body: string,
  signature: string,
  secret: string
): boolean => {
  try {
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    return generated_signature === signature;
  } catch (error) {
    return false;
  }
};
