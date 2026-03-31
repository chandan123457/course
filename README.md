# GradToPro - Full Stack Application

A comprehensive full-stack web application for managing courses, webinars, and user enrollments with integrated payment processing.

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: Firebase Admin SDK
- **Payment Gateway**: Razorpay
- **Security**: Helmet, Express Rate Limit
- **Logging**: Winston
- **Validation**: Express Validator

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **HTTP Client**: Axios
- **Payment**: Razorpay Checkout

## 📁 Project Structure

```
hero/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── middlewares/      # Custom middleware
│   │   ├── utils/            # Utility functions
│   │   ├── db/               # Database connection & schema
│   │   └── server.ts         # Entry point
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── pages/            # Page components
    │   ├── contexts/         # React contexts
    │   ├── config/           # Configuration files
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── .env
    └── package.json
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database (or Neon account)
- Firebase project
- Razorpay account

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   The `.env` file is already configured with:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=postgresql://neondb_owner:npg_2rOwqMfc1Ipy@ep-dawn-thunder-anqdq7sr-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   RAZORPAY_KEY_ID=rzp_test_RfMMo2ojR2ItiW
   RAZORPAY_KEY_SECRET=lVO33r15GL7bZyt92KjSvO41
   FRONTEND_URL=http://localhost:3000
   ```

4. **Run database migrations**
   ```bash
   npm run dev
   ```

   The database schema will be automatically initialized on first run.

5. **Start the server**
   ```bash
   npm run dev          # Development
   npm run build        # Build for production
   npm start            # Production
   ```

   Server runs on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**

   Update `/src/config/firebase.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Configure environment variables**

   The `.env` file is already configured:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

   App runs on: `http://localhost:3000`

## 🔐 Authentication Flow

1. User enters phone number
2. OTP is sent via Firebase
3. User verifies OTP
4. User fills signup form (name, email, password)
5. Account is created in Firebase
6. User details are saved to PostgreSQL
7. User can sign in with email/password for subsequent logins

## 💳 Payment Flow

### Course Enrollment
1. User clicks "Enroll Now" on a course
2. Backend creates Razorpay order
3. Frontend opens Razorpay checkout
4. User completes payment
5. Payment verification happens in two ways:
   - **Frontend**: Immediate verification after payment
   - **Webhook**: Server-side verification (source of truth)
6. User is enrolled in the course
7. Telegram link is displayed

### Webinar Registration
- Completely free
- Requires login
- One-click registration
- No payment needed

## 📡 API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `GET /api/users/profile` - Get user profile

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/enrollment` - Check enrollment status
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Webinars
- `GET /api/webinars` - List all webinars
- `GET /api/webinars/:id` - Get webinar details
- `POST /api/webinars/:id/register` - Register for webinar
- `GET /api/webinars/:id/registration` - Check registration
- `POST /api/webinars` - Create webinar (Admin)
- `PUT /api/webinars/:id` - Update webinar (Admin)
- `DELETE /api/webinars/:id` - Delete webinar (Admin)

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Razorpay webhook

## 🛡️ Security Features

- **Helmet**: Secure HTTP headers
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: Validate all user inputs
- **Firebase Auth**: Secure authentication
- **Razorpay Signature Verification**: Prevent payment tampering
- **Environment Variables**: Sensitive data protection

## 🎨 UI/UX Features

- Modern, clean, and premium design
- Responsive layout for all devices
- Smooth animations and transitions
- Professional spacing and typography
- Reusable components
- Gradient backgrounds
- Card-based layouts
- Interactive elements

## 📝 Database Schema

### Tables
- **users**: User information
- **courses**: Course details
- **webinars**: Webinar information
- **orders**: Payment orders
- **payments**: Payment records
- **course_enrollments**: User-course relationships
- **webinar_registrations**: User-webinar relationships

## 🔨 Admin Operations

To manage courses and webinars, include the admin header:
```javascript
headers: {
  'x-admin-key': 'gradtopro_admin_2024'
}
```

**Note**: In production, implement a proper admin role system.

## 🚀 Deployment

### Backend
1. Build the TypeScript code: `npm run build`
2. Deploy the `dist` folder to your server
3. Set environment variables
4. Run: `npm start`

### Frontend
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Configure environment variables

## 📦 Production Checklist

- [ ] Update Firebase configuration
- [ ] Set up proper admin authentication
- [ ] Configure CORS for production domain
- [ ] Set up SSL certificates
- [ ] Configure webhook endpoint with Razorpay
- [ ] Set up proper logging and monitoring
- [ ] Enable Firebase App Check
- [ ] Set up database backups
- [ ] Configure rate limits appropriately
- [ ] Review and update security headers

## 🤝 Contributing

This is a production-ready application. Follow these guidelines:
- Write clean, maintainable code
- Add comments for complex logic
- Follow TypeScript/JavaScript best practices
- Test thoroughly before deployment

## 📄 License

Proprietary - All rights reserved

## 👥 Support

For issues or questions, please contact the development team.
