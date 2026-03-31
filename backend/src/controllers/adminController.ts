import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { asyncHandler, AppError, handleValidationErrors } from '../middlewares/errorHandler';
import { courseService } from '../services/courseService';
import { webinarService } from '../services/webinarService';
import logger from '../utils/logger';

// Simple admin authentication (in production, use proper JWT/session based auth)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'gradtopro2024';

export const adminController = {
  // Admin login
  login: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      throw new AppError('Invalid admin credentials', 401);
    }

    // Generate admin token (simple approach)
    const adminToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: {
        token: adminToken,
        user: { username, role: 'admin' },
      },
    });
  }),

  // Get dashboard stats
  getDashboardStats: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const [courses, webinars] = await Promise.all([
      courseService.getAllCourses(),
      webinarService.getAllWebinars(),
    ]);

    const stats = {
      totalCourses: courses.length,
      activeCourses: courses.filter(c => c.isActive).length,
      totalWebinars: webinars.length,
      activeWebinars: webinars.filter(w => w.isActive).length,
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  }),

  // Course management
  createCourse: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Log the received data for debugging
    logger.info('Creating course with data:', req.body);

    const courseData = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      syllabus: req.body.syllabus,
      teacher: req.body.teacher,
      price: parseInt(req.body.price),
      start_date: req.body.startDate,
      end_date: req.body.endDate,
      telegram_link: req.body.telegramLink || undefined,
    };

    const course = await courseService.createCourse(courseData);

    logger.info('Course created by admin', { courseId: course.id, title: course.title });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  }),

  updateCourse: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courseId = parseInt(req.params.id);
    const updateData = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      syllabus: req.body.syllabus,
      teacher: req.body.teacher,
      price: parseInt(req.body.price),
      start_date: req.body.startDate,
      end_date: req.body.endDate,
      telegram_link: req.body.telegramLink || undefined,
      is_active: req.body.isActive,
    };

    const course = await courseService.updateCourse(courseId, updateData);

    logger.info('Course updated by admin', { courseId, title: course.title });

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  }),

  deleteCourse: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courseId = parseInt(req.params.id);

    await courseService.deleteCourse(courseId);

    logger.info('Course deleted by admin', { courseId });

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  }),

  // Webinar management
  createWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const webinarData = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      teacher: req.body.teacher,
      date: req.body.date,
      time: req.body.time,
    };

    const webinar = await webinarService.createWebinar(webinarData);

    logger.info('Webinar created by admin', { webinarId: webinar.id, title: webinar.title });

    res.status(201).json({
      success: true,
      message: 'Webinar created successfully',
      data: webinar,
    });
  }),

  updateWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const webinarId = parseInt(req.params.id);
    const updateData = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      teacher: req.body.teacher,
      date: req.body.date,
      time: req.body.time,
      is_active: req.body.isActive,
    };

    const webinar = await webinarService.updateWebinar(webinarId, updateData);

    logger.info('Webinar updated by admin', { webinarId, title: webinar.title });

    res.status(200).json({
      success: true,
      message: 'Webinar updated successfully',
      data: webinar,
    });
  }),

  deleteWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const webinarId = parseInt(req.params.id);

    await webinarService.deleteWebinar(webinarId);

    logger.info('Webinar deleted by admin', { webinarId });

    res.status(200).json({
      success: true,
      message: 'Webinar deleted successfully',
    });
  }),

  // Get all courses for admin
  getAllCourses: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courses = await courseService.getAllCourses();

    res.status(200).json({
      success: true,
      data: courses,
    });
  }),

  // Get all webinars for admin
  getAllWebinars: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const webinars = await webinarService.getAllWebinars();

    res.status(200).json({
      success: true,
      data: webinars,
    });
  }),
};

// Validation middleware
export const validateAdminLogin = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateCourse = [
  body('title').notEmpty().withMessage('Title is required'),
  body('image').isURL().withMessage('Valid image URL is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('syllabus').notEmpty().withMessage('Syllabus is required'),
  body('teacher').notEmpty().withMessage('Teacher is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Valid start date is required (YYYY-MM-DD)'),
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('Valid end date is required (YYYY-MM-DD)'),
  body('telegramLink')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Valid Telegram link is required'),
  handleValidationErrors,
];

export const validateWebinar = [
  body('title').notEmpty().withMessage('Title is required'),
  body('image').isURL().withMessage('Valid image URL is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('teacher').notEmpty().withMessage('Teacher is required'),
  body('date').isDate().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  handleValidationErrors,
];