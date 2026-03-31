import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth } from '../config/firebase';
import app from '../config/firebase';

/**
 * ============================================================================
 * FIREBASE AUTH + FIRESTORE USER STORAGE
 * ============================================================================
 *
 * This alternative approach uses Firestore to store user data instead of
 * your backend API. This eliminates the 400/404 errors you were seeing.
 *
 * ADVANTAGES:
 * - No backend API needed for user data
 * - Real-time data sync
 * - Offline support
 * - Integrated with Firebase Auth
 *
 * USER DATA STRUCTURE:
 * users/{uid} = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   phone: "+918252188485",
 *   createdAt: timestamp,
 *   lastLoginAt: timestamp
 * }
 * ============================================================================
 */

// Initialize Firestore
const db = getFirestore(app);

const FirestoreAuthPage = () => {
  const navigate = useNavigate();

  // UI state
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  /**
   * ============================================================================
   * SIGNUP WITH FIRESTORE STORAGE
   * ============================================================================
   */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      console.log('🚀 Starting signup with Firestore...');

      // STEP 1: Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log('✅ Firebase user created:', user.uid);

      // STEP 2: Update Firebase profile
      await updateProfile(user, {
        displayName: formData.name,
      });
      console.log('✅ Firebase profile updated');

      // STEP 3: Save user data to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        isActive: true,
      });
      console.log('✅ User data saved to Firestore');

      // STEP 4: Success!
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/'), 1500);

    } catch (error) {
      console.error('❌ Signup error:', error);
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================================
   * SIGNIN WITH FIRESTORE UPDATE
   * ============================================================================
   */
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      console.log('🔑 Signing in...');

      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log('✅ Sign in successful:', user.uid);

      // Update last login time in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Update existing user's last login
        await setDoc(userDocRef, {
          lastLoginAt: serverTimestamp(),
        }, { merge: true });
        console.log('✅ Last login updated');
      } else {
        // Create user document if it doesn't exist (legacy users)
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || 'Unknown',
          email: user.email,
          phone: '',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          isActive: true,
        });
        console.log('✅ User document created');
      }

      navigate('/'); // Redirect to home

    } catch (error) {
      console.error('❌ Sign in error:', error);
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================================
   * GET USER DATA FROM FIRESTORE
   * ============================================================================
   * Helper function to fetch user data from Firestore
   * Use this in your app to get user profile data
   */
  const getUserData = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log('No user data found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  /**
   * ============================================================================
   * ERROR HANDLING
   * ============================================================================
   */
  const handleAuthError = (error) => {
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email already registered. Try signing in instead.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Try again later.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Check your connection.');
          break;
        default:
          setError(`Error: ${error.message}`);
      }
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  /**
   * ============================================================================
   * FORM HELPERS
   * ============================================================================
   */
  const updateForm = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  /**
   * ============================================================================
   * UI RENDER (Same as CleanAuthPage)
   * ============================================================================
   */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create account (Firestore)' : 'Sign in (Firestore)'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccess('');
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isSignUp ? 'sign in to existing account' : 'create a new account'}
            </button>
          </p>
          <p className="mt-1 text-center text-xs text-gray-500">
            User data stored in Firestore (no backend API needed)
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <div className="space-y-4">
            {/* Name field (signup only) */}
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={updateForm('name')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your full name"
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={updateForm('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                value={formData.password}
                onChange={updateForm('password')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              {isSignUp && (
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
              )}
            </div>

            {/* Phone field (signup only, optional) */}
            {isSignUp && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number (Optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={updateForm('phone')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="+918252188485"
                />
                <p className="mt-1 text-xs text-gray-500">Format: +[country code][number]</p>
              </div>
            )}
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </div>
        </form>

        {/* Debug info */}
        <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs text-gray-600">
          <strong>How this works:</strong><br />
          • Firebase Authentication for login<br />
          • Firestore for user data storage<br />
          • No backend API calls (eliminates 404 errors)<br />
          • Real-time data sync included
        </div>
      </div>
    </div>
  );
};

// Export the getUserData function for use in other components
export { getUserData };
export default FirestoreAuthPage;