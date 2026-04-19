import express from 'express';
import {
  webinarController,
  validateCreateWebinar,
  validateLeadRegistration,
} from '../controllers/webinarController';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', webinarController.getAllWebinars);
router.post('/:id/register', validateLeadRegistration, webinarController.registerLeadForWebinar);

// Protected routes (require authentication)
router.post('/register', authenticate, webinarController.registerForWebinar);
router.get('/user/my-webinars', authenticate, webinarController.getUserWebinars);
router.get('/:id', webinarController.getWebinarById);

// Admin routes
router.post('/', isAdmin, validateCreateWebinar, webinarController.createWebinar);
router.put('/:id', isAdmin, webinarController.updateWebinar);
router.delete('/:id', isAdmin, webinarController.deleteWebinar);

export default router;
