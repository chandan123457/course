import express from 'express';
import { courseController, validateCreateCourse } from '../controllers/courseController';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Protected routes (require authentication)
router.get('/user/my-courses', authenticate, courseController.getUserCourses);

// Admin routes
router.post('/', isAdmin, validateCreateCourse, courseController.createCourse);
router.put('/:id', isAdmin, courseController.updateCourse);
router.delete('/:id', isAdmin, courseController.deleteCourse);

export default router;
