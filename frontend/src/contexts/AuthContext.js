import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber as firebaseSignInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../config/api';

/**
 * ============================================================================
 * AUTHENTICATION CONTEXT - Manages Firebase Authentication
 * ============================================================================
 *
 * This context provides authentication methods and state to the entire app.
 *
 * PHONE AUTHENTICATION FLOW:
 * --------------------------
 * 1. setupRecaptcha() - Creates invisible RecaptchaVerifier
 * 2. signInWithPhoneNumber() - Sends OTP to phone number
 * 3. User receives OTP on their phone
 * 4. confirmationResult.confirm(code) - Verifies OTP
 * 5. After verification, create Email/Password account
 *
 * IMPORTANT NOTES:
 * ---------------
 * - RecaptchaVerifier is REQUIRED by Firebase for phone auth (security measure)
 * - RecaptchaVerifier is invisible to user (runs in background)
 * - Phone authentication is ONLY for verification, not for login
 * - After phone verification, users login with Email/Password
 * - Firebase handles all OTP sending/verification internally
 * ============================================================================
 */

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Current Firebase user (from Firebase Authentication)
  const [currentUser, setCurrentUser] = useState(null);

  // User data from backend database
  const [dbUser, setDbUser] = useState(null);

  // Loading state (true while checking if user is logged in)
  const [loading, setLoading] = useState(true);

  /**
   * ============================================================================
   * LISTEN FOR AUTH STATE CHANGES
   * ============================================================================
   * Firebase automatically tracks when user logs in/out
   * This listener runs whenever auth state changes
   * ============================================================================
   */
  useEffect(() => {
    console.log('🔄 Setting up Firebase auth listener...');

    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('👤 Auth state changed:', user ? user.email : 'No user');

      setCurrentUser(user);

      if (user) {
        // User is signed in - fetch their data from backend
        try {
          const response = await api.get('/users/profile');
          setDbUser(response.data.data);
          console.log('✅ User profile loaded from database');
        } catch (error) {
          console.error('❌ Error fetching user profile:', error);
        }
      } else {
        // User is signed out
        setDbUser(null);
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  /**
   * ============================================================================
   * SETUP RECAPTCHA VERIFIER (Required for Phone Authentication)
   * ============================================================================
   *
   * RecaptchaVerifier is a security measure required by Firebase for phone auth.
   * It prevents bots from abusing the SMS service.
   *
   * HOW IT WORKS:
   * -------------
   * 1. Creates an invisible reCAPTCHA widget
   * 2. Runs in background (user doesn't see anything)
   * 3. Verifies the request is from a real browser, not a bot
   * 4. Required before calling signInWithPhoneNumber()
   *
   * CONTAINER ID:
   * ------------
   * The containerId must match a <div id="recaptcha-container"></div> in your HTML
   * This div is in App.js
   *
   * SIZE: 'invisible'
   * -----------------
   * User doesn't see the reCAPTCHA challenge
   * Firebase handles verification automatically
   *
   * WHY SINGLETON PATTERN?
   * ---------------------
   * We store it in window.recaptchaVerifier to reuse it
   * Creating multiple verifiers causes errors
   * ============================================================================
   */
  const setupRecaptcha = (containerId) => {
    console.log('🤖 Setting up RecaptchaVerifier...');

    // Check if RecaptchaVerifier already exists (singleton pattern)
    if (!window.recaptchaVerifier) {
      console.log('🆕 Creating new RecaptchaVerifier');

      // Create new RecaptchaVerifier
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // Firebase auth instance
        containerId, // HTML element ID where reCAPTCHA renders
        {
          size: 'invisible', // User doesn't see it
          callback: (response) => {
            // Called when reCAPTCHA is solved
            console.log('✅ RecaptchaVerifier solved');
          },
          'expired-callback': () => {
            // Called when reCAPTCHA expires (after 2 minutes)
            console.log('⏰ RecaptchaVerifier expired');
            // Clear it so a new one is created next time
            window.recaptchaVerifier = null;
          },
        }
      );
    } else {
      console.log('♻️ Reusing existing RecaptchaVerifier');
    }

    return window.recaptchaVerifier;
  };

  /**
   * ============================================================================
   * SEND OTP TO PHONE NUMBER
   * ============================================================================
   *
   * This function:
   * 1. Sets up RecaptchaVerifier (if not already set up)
   * 2. Calls Firebase signInWithPhoneNumber()
   * 3. Firebase sends OTP via SMS to the phone number
   * 4. Returns a confirmationResult object
   *
   * THE confirmationResult OBJECT:
   * -----------------------------
   * Has a .confirm(code) method to verify the OTP
   * Store this object and use it when user enters OTP
   *
   * PHONE NUMBER FORMAT:
   * -------------------
   * Must be E.164 format: +[country_code][number]
   * Examples:
   *   - India: +918252188485
   *   - USA: +16505551234
   *
   * IMPORTANT:
   * ---------
   * This function ONLY sends OTP - it doesn't create a user account!
   * After OTP is verified, you need to create Email/Password account
   * ============================================================================
   */
  const signInWithPhoneNumber = async (phoneNumber) => {
    try {
      console.log('📱 Initiating phone authentication...');
      console.log('📞 Phone number:', phoneNumber);

      // Step 1: Setup RecaptchaVerifier
      const recaptchaVerifier = setupRecaptcha('recaptcha-container');
      console.log('✅ RecaptchaVerifier ready');

      // Step 2: Call Firebase signInWithPhoneNumber
      // This will:
      // - Verify reCAPTCHA
      // - Send OTP via SMS
      // - Return confirmationResult object
      console.log('📤 Sending OTP...');
      const confirmationResult = await firebaseSignInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );

      console.log('✅ OTP sent successfully!');
      console.log('📦 ConfirmationResult object created');

      // Return confirmationResult so it can be used to verify OTP later
      return confirmationResult;
    } catch (error) {
      console.error('❌ Error sending OTP:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);

      // Clean up RecaptchaVerifier on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      throw error;
    }
  };

  /**
   * ============================================================================
   * SIGN IN WITH EMAIL AND PASSWORD (For Existing Users)
   * ============================================================================
   *
   * This is for users who already created an account.
   * They sign in with Email/Password, NOT phone number.
   *
   * FLOW:
   * -----
   * 1. User enters email and password
   * 2. Firebase verifies credentials
   * 3. If valid, user is signed in
   * 4. onAuthStateChanged listener fires
   * 5. User data is fetched from backend
   * ============================================================================
   */
  const signIn = async (email, password) => {
    try {
      console.log('🔑 Signing in with email/password...');
      console.log('📧 Email:', email);

      // Sign in with Firebase
      const result = await signInWithEmailAndPassword(auth, email, password);

      console.log('✅ Sign in successful!');
      console.log('👤 User ID:', result.user.uid);

      return result.user;
    } catch (error) {
      console.error('❌ Error signing in:', error);
      console.error('Error code:', error.code);
      throw error;
    }
  };

  /**
   * ============================================================================
   * SIGN OUT
   * ============================================================================
   * Signs out the current user from Firebase
   * ============================================================================
   */
  const signOut = async () => {
    try {
      console.log('👋 Signing out...');
      await firebaseSignOut(auth);
      console.log('✅ Signed out successfully');
    } catch (error) {
      console.error('❌ Error signing out:', error);
      throw error;
    }
  };

  /**
   * ============================================================================
   * CONTEXT VALUE
   * ============================================================================
   * All these values/methods are available to any component that uses useAuth()
   * ============================================================================
   */
  const value = {
    // User state
    currentUser, // Firebase user object
    dbUser, // User data from database
    loading, // True while checking auth state

    // Authentication methods
    signInWithPhoneNumber, // Send OTP to phone
    signIn, // Sign in with email/password
    signOut, // Sign out user
    setupRecaptcha, // Setup RecaptchaVerifier (exposed for manual setup if needed)
  };

  // Don't render children until we know if user is logged in
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
