# Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- PostgreSQL database (Neon account already configured)
- Firebase project
- Razorpay test account

## Step 1: Clone and Setup

```bash
# Navigate to project root
cd /home/chandan/Documents/GradToPro/hero
```

## Step 2: Backend Setup

```bash
# Go to backend
cd backend

# Install dependencies
npm install

# Environment variables are already configured in .env
# Start the server
npm run dev
```

Backend will run on: **http://localhost:5000**

## Step 3: Frontend Setup

```bash
# Open new terminal
# Go to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Update Firebase config in src/config/firebase.js
# Environment variables are already configured in .env
# Start the app
npm start
```

Frontend will run on: **http://localhost:3000**

## Step 4: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Authentication** → **Email/Password** and **Phone**
4. Copy your config from Project Settings
5. Update `frontend/src/config/firebase.js`:

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

## Step 5: Test the Application

### Test Authentication
1. Go to http://localhost:3000
2. Click "Sign In" in header
3. Choose "Create New Account"
4. Enter phone number (use +91 prefix for India)
5. Enter OTP from Firebase Console (in non-production)
6. Complete signup form

### Test Webinars (Free)
1. Go to "Webinars" in navigation
2. Click on any webinar
3. Click "Register Free"
4. Check registration status

### Test Courses (Paid)
1. Go to "Courses" in navigation
2. Click on any course
3. Click "Enroll Now"
4. Razorpay test payment will open
5. Use test cards provided by Razorpay
6. After payment, you'll see Telegram link

## Razorpay Test Cards

```
Test Card: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

## Admin Operations

To create courses/webinars, use the admin key in API calls:

```javascript
headers: {
  'x-admin-key': 'gradtopro_admin_2024'
}
```

### Create a Course

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "x-admin-key: gradtopro_admin_2024" \
  -d '{
    "title": "Full Stack Development Bootcamp",
    "image": "https://example.com/image.jpg",
    "description": "Learn full stack development from scratch",
    "syllabus": "Week 1: HTML/CSS\nWeek 2: JavaScript\n...",
    "teacher": "John Doe",
    "price": 9999,
    "startDate": "2024-04-01",
    "endDate": "2024-07-01",
    "telegramLink": "https://t.me/joinchat/xxx"
  }'
```

### Create a Webinar

```bash
curl -X POST http://localhost:5000/api/webinars \
  -H "Content-Type: application/json" \
  -H "x-admin-key: gradtopro_admin_2024" \
  -d '{
    "title": "Introduction to AI",
    "image": "https://example.com/image.jpg",
    "description": "Learn the basics of AI and ML",
    "teacher": "Jane Smith",
    "date": "2024-04-15",
    "time": "18:00"
  }'
```

## Database Schema

The database schema is automatically created when you run the backend for the first time. Tables created:

- users
- courses
- webinars
- orders
- payments
- course_enrollments
- webinar_registrations

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Check if DATABASE_URL is correct in backend/.env
- Verify Neon database is accessible

### Firebase Auth Error
- Check if Firebase config is updated
- Verify Phone authentication is enabled in Firebase Console
- For testing, add your phone number in Firebase Console → Phone Numbers for Testing

### Razorpay Payment Error
- Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env
- Check if Razorpay script is loaded (check browser console)
- Use test cards provided by Razorpay

## Production Deployment

### Backend
1. Build: `npm run build`
2. Deploy dist folder
3. Set environment variables
4. Configure webhook URL in Razorpay dashboard

### Frontend
1. Update firebase.js with production config
2. Update .env with production API URL
3. Build: `npm run build`
4. Deploy build folder to hosting service

## Support

For issues or questions, check:
1. Console logs in browser (F12)
2. Backend logs in terminal
3. Network tab in browser DevTools
4. README.md for detailed documentation
