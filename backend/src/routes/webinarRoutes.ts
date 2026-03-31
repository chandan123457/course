import express from 'express';
import { webinarController, validateCreateWebinar } from '../controllers/webinarController';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', webinarController.getAllWebinars);
router.get('/:id', webinarController.getWebinarById);

// Protected routes (require authentication)
router.post('/register', authenticate, webinarController.registerForWebinar);
router.get('/user/my-webinars', authenticate, webinarController.getUserWebinars);

// Admin routes
router.post('/', isAdmin, validateCreateWebinar, webinarController.createWebinar);
router.put('/:id', isAdmin, webinarController.updateWebinar);
router.delete('/:id', isAdmin, webinarController.deleteWebinar);

export default router;
