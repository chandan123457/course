# Firebase Authentication Setup Guide

## Problem
You're seeing this error:
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

This is because Firebase configuration is not set up with your actual Firebase project credentials.

## Solution: Set Up Firebase Project

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Enter project name (e.g., "GradToPro")
4. Follow the setup wizard
5. Click **"Create project"**

### Step 2: Register Your Web App

1. In Firebase Console, click the **⚙️ (Settings)** icon → **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **</>** (Web) icon to register a web app
4. Enter app nickname: `GradToPro Web`
5. ✅ Check **"Also set up Firebase Hosting"** (optional)
6. Click **"Register app"**

### Step 3: Copy Firebase Configuration

You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "gradtopro-xxxxx.firebaseapp.com",
  projectId: "gradtopro-xxxxx",
  storageBucket: "gradtopro-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### Step 4: Add Credentials to .env File

Open `/home/chandan/Documents/GradToPro/hero/frontend/.env` and add:

```bash
# API Base URL
REACT_APP_API_URL=http://localhost:5000/api

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyXxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=gradtopro-xxxxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=gradtopro-xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=gradtopro-xxxxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

⚠️ **Replace with YOUR actual values from Firebase Console**

### Step 5: Enable Phone Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get started"** if you haven't enabled Authentication
3. Go to **"Sign-in method"** tab
4. Click on **"Phone"** provider
5. Click **"Enable"** toggle
6. Click **"Save"**

### Step 6: Configure reCAPTCHA (for Phone Auth)

Firebase automatically handles reCAPTCHA for phone authentication, but you need to:

1. In Firebase Console → **Authentication** → **Settings** tab
2. Scroll to **"Authorized domains"**
3. Make sure `localhost` is in the list (it should be by default)
4. For production, add your actual domain later

### Step 7: Add Test Phone Numbers (Optional - for development)

To test without using real SMS:

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Scroll down to **"Phone numbers for testing"**
3. Click **"Add phone number"**
4. Add test phone: `+1 650-555-3434` with code: `123456`
5. Click **"Add"**

Now you can test with this phone number without sending real OTP.

### Step 8: Restart Your React App

After adding environment variables:

```bash
cd /home/chandan/Documents/GradToPro/hero/frontend
npm start
```

**Important:** React requires restart after changing `.env` file!

---

## Verification Checklist

✅ Firebase project created
✅ Web app registered in Firebase
✅ All 6 environment variables added to `.env` file
✅ Phone authentication enabled in Firebase Console
✅ `localhost` in authorized domains
✅ React app restarted after .env changes

---

## Common Issues

### Issue 1: "api-key-not-valid" error persists
- **Solution**: Make sure you restarted the React app after changing `.env`
- **Solution**: Verify all environment variables are correctly copied (no extra spaces)
- **Solution**: Check browser console for any "Missing required Firebase environment variables" errors

### Issue 2: reCAPTCHA not appearing
- **Solution**: Make sure you have `<div id="recaptcha-container"></div>` in your HTML
- **Solution**: Check if phone authentication is enabled in Firebase Console

### Issue 3: "auth/invalid-phone-number"
- **Solution**: Phone numbers must be in E.164 format: `+[country_code][number]`
- **Example**: `+919876543210` (India), `+16505553434` (USA)

### Issue 4: "auth/quota-exceeded"
- **Solution**: Firebase has SMS quota limits on free plan
- **Solution**: Use test phone numbers (Step 7) during development
- **Solution**: Upgrade to paid plan for production

---

## Security Notes

🔒 **Never commit `.env` file to Git!**

The `.env` file is already in `.gitignore`, but double-check:

```bash
cat /home/chandan/Documents/GradToPro/hero/frontend/.gitignore | grep .env
```

Should show `.env` in the list.

---

## Firebase Console Quick Links

After setup, bookmark these:

- **Dashboard**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/overview
- **Authentication**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/users
- **Project Settings**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general

Replace `YOUR_PROJECT_ID` with your actual project ID.

---

## Next Steps

After Firebase is configured:

1. Test phone authentication with a test phone number
2. Verify OTP is received (or use test code `123456`)
3. Check that user is created in Firebase Console → Authentication → Users
4. Verify user is saved to your PostgreSQL database via backend API

---

## Need Help?

If you're still seeing errors after following this guide:

1. Check browser console for specific error messages
2. Verify all Firebase config values are correct (no placeholders)
3. Make sure `.env` file is in the correct location
4. Confirm React app was restarted after `.env` changes
