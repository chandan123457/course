import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { courseService } from '../services/courseService';
import { asyncHandler, AppError } from '../middlewares/errorHandler';

export const courseController = {
  // Create course (Admin only)
  createCourse: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, image, description, syllabus, teacher, price, start_date, end_date, telegram_link } = req.body;

    if (!title || !image || !description || !syllabus || !teacher || !price || !start_date || !end_date) {
      throw new AppError('All required fields must be provided', 400);
    }

    const course = await courseService.createCourse({
      title,
      image,
      description,
      syllabus,
      teacher,
      price,
      start_date,
      end_date,
      telegram_link,
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  }),

  // Get all courses
  getAllCourses: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courses = await courseService.getAllCourses();

    res.status(200).json({
      success: true,
      data: courses,
    });
  }),

  // Get course by ID
  getCourseById: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const course = await courseService.getCourseById(parseInt(id));

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  }),

  // Update course (Admin only)
  updateCourse: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;

    const course = await courseService.updateCourse(parseInt(id), updateData);

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  }),

  // Delete course (Admin only)
  deleteCourse: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await courseService.deleteCourse(parseInt(id));

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  }),

  // Get user's enrolled courses
  getUserCourses: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const courses = await courseService.getUserCourses(userId);

    res.status(200).json({
      success: true,
      data: courses,
    });
  }),
};

// Validation middleware
export const validateCreateCourse = [
  body('title').notEmpty().withMessage('Title is required'),
  body('image').notEmpty().withMessage('Image is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('syllabus').notEmpty().withMessage('Syllabus is required'),
  body('teacher').notEmpty().withMessage('Teacher name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('start_date').notEmpty().withMessage('Start date is required'),
  body('end_date').notEmpty().withMessage('End date is required'),
];
