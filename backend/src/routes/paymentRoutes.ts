import express from 'express';
import { paymentController, validateCreateOrder, validateVerifyPayment } from '../controllers/paymentController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// Protected routes (require authentication)
router.post('/create-order', authenticate, validateCreateOrder, paymentController.createOrder);
router.post('/verify', authenticate, validateVerifyPayment, paymentController.verifyPayment);

// Webhook route (no authentication required, verified by signature)
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

export default router;
