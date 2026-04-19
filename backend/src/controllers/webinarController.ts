import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { webinarService } from '../services/webinarService';
import { asyncHandler, AppError, handleValidationErrors } from '../middlewares/errorHandler';

export const webinarController = {
  // Create webinar (Admin only)
  createWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, image, description, teacher, date, time } = req.body;

    if (!title || !image || !description || !teacher || !date || !time) {
      throw new AppError('All fields are required', 400);
    }

    const webinar = await webinarService.createWebinar({
      title,
      image,
      description,
      teacher,
      date,
      time,
    });

    res.status(201).json({
      success: true,
      message: 'Webinar created successfully',
      data: webinar,
    });
  }),

  // Get all webinars
  getAllWebinars: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const webinars = await webinarService.getAllWebinars();

    res.status(200).json({
      success: true,
      data: webinars,
    });
  }),

  // Get webinar by ID
  getWebinarById: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const webinar = await webinarService.getWebinarById(parseInt(id));

    if (!webinar) {
      throw new AppError('Webinar not found', 404);
    }

    res.status(200).json({
      success: true,
      data: webinar,
    });
  }),

  // Update webinar (Admin only)
  updateWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;

    const webinar = await webinarService.updateWebinar(parseInt(id), updateData);

    if (!webinar) {
      throw new AppError('Webinar not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Webinar updated successfully',
      data: webinar,
    });
  }),

  // Delete webinar (Admin only)
  deleteWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await webinarService.deleteWebinar(parseInt(id));

    res.status(200).json({
      success: true,
      message: 'Webinar deleted successfully',
    });
  }),

  // Register for webinar
  registerForWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { webinarId } = req.body;
    const userId = req.user!.id;

    if (!webinarId) {
      throw new AppError('Webinar ID is required', 400);
    }

    // Check if webinar exists
    const webinar = await webinarService.getWebinarById(webinarId);
    if (!webinar) {
      throw new AppError('Webinar not found', 404);
    }

    // Check if already registered
    const isRegistered = await webinarService.isUserRegistered(userId, webinarId);
    if (isRegistered) {
      throw new AppError('Already registered for this webinar', 400);
    }

    const registration = await webinarService.registerForWebinar(userId, webinarId);

    res.status(201).json({
      success: true,
      message: 'Registered for webinar successfully',
      data: registration,
    });
  }),

  // Public registration for webinar landing page
  registerLeadForWebinar: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const webinarId = parseInt(req.params.id, 10);
    const {
      fullName,
      email,
      phoneNumber,
      collegeOrProfession,
      courseInterest,
      experienceLevel,
      referralSource,
      questions,
    } = req.body;

    if (Number.isNaN(webinarId)) {
      throw new AppError('Valid webinar ID is required', 400);
    }

    const webinar = await webinarService.getWebinarById(webinarId);
    if (!webinar) {
      throw new AppError('Webinar not found', 404);
    }

    const registration = await webinarService.registerLeadForWebinar(webinarId, {
      fullName,
      email,
      phoneNumber,
      collegeOrProfession,
      courseInterest,
      experienceLevel,
      referralSource,
      questions,
    });

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: registration,
    });
  }),

  // Get user's registered webinars
  getUserWebinars: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const webinars = await webinarService.getUserWebinars(userId);

    res.status(200).json({
      success: true,
      data: webinars,
    });
  }),
};

// Validation middleware
export const validateCreateWebinar = [
  body('title').notEmpty().withMessage('Title is required'),
  body('image').notEmpty().withMessage('Image is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('teacher').notEmpty().withMessage('Teacher name is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
];

export const validateLeadRegistration = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Full name must be between 2 and 120 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 7, max: 20 })
    .withMessage('Phone number must be between 7 and 20 characters'),
  body('collegeOrProfession')
    .trim()
    .notEmpty()
    .withMessage('College or profession is required'),
  body('courseInterest')
    .trim()
    .notEmpty()
    .withMessage('Course interest is required'),
  body('experienceLevel')
    .trim()
    .notEmpty()
    .withMessage('Experience level is required'),
  body('referralSource')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 160 })
    .withMessage('Referral source must be 160 characters or fewer'),
  body('questions')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Questions must be 1000 characters or fewer'),
  handleValidationErrors,
];
