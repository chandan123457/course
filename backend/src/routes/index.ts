import express from 'express';
import userRoutes from './userRoutes';
import webinarRoutes from './webinarRoutes';
import courseRoutes from './courseRoutes';
import paymentRoutes from './paymentRoutes';
import adminRoutes from './adminRoutes';

const router = express.Router();

// API routes
router.use('/users', userRoutes);
router.use('/webinars', webinarRoutes);
router.use('/courses', courseRoutes);
router.use('/payments', paymentRoutes);
router.use('/admin', adminRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
