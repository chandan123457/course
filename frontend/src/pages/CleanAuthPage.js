import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../config/api';

/**
 * ============================================================================
 * CLEAN FIREBASE AUTHENTICATION WITH PROPER ERROR HANDLING
 * ============================================================================
 *
 * SIGNUP FLOW:
 * 1. Create Firebase user with Email/Password
 * 2. Update Firebase profile with display name
 * 3. Save user to backend database (optional)
 * 4. Handle errors properly (separate Firebase vs Backend errors)
 *
 * LOGIN FLOW:
 * 1. Sign in with Firebase Email/Password
 * 2. Firebase auth state listener handles the rest
 *
 * ERROR HANDLING:
 * - Firebase errors: auth/email-already-in-use, auth/weak-password, etc.
 * - Backend errors: 400/404/500 from your API
 * - Network errors: Connection issues
 * ============================================================================
 */

const CleanAuthPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

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
    phone: '', // Optional
  });

  /**
   * ============================================================================
   * SIGNUP FUNCTION - Create Account with Proper Error Handling
   * ============================================================================
   */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    let firebaseUser = null;

    try {
      console.log('🚀 Starting signup process...');

      // STEP 1: Create Firebase user
      console.log('1️⃣ Creating Firebase user...');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      firebaseUser = userCredential.user;
      console.log('✅ Firebase user created:', firebaseUser.uid);

      // STEP 2: Update Firebase profile
      console.log('2️⃣ Updating Firebase profile...');
      await updateProfile(firebaseUser, {
        displayName: formData.name,
      });
      console.log('✅ Firebase profile updated');

      // STEP 3: Save to backend database (OPTIONAL - handle errors gracefully)
      console.log('3️⃣ Saving to backend database...');
      try {
        await api.post('/users/create', {
          firebaseUid: firebaseUser.uid,
          phone: formData.phone || '',
          name: formData.name,
          email: formData.email,
        });
        console.log('✅ User saved to backend database');
      } catch (backendError) {
        console.warn('⚠️ Backend save failed (Firebase user still created):', backendError);

        // Don't fail the entire signup if backend fails
        // Firebase user is already created and functional
        setSuccess('Account created! (Note: Some user data may not be saved)');
      }

      // STEP 4: Success!
      console.log('🎉 Signup completed successfully!');
      setSuccess('Account created successfully! Redirecting...');

      setTimeout(() => {
        navigate('/'); // Redirect after short delay
      }, 1500);

    } catch (error) {
      console.error('❌ Signup error:', error);

      // Handle Firebase-specific errors
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
          case 'auth/operation-not-allowed':
            setError('Email/Password authentication is not enabled.');
            break;
          default:
            setError(`FirebaseError: ${error.message}`);
        }
      } else {
        // Network or other errors
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================================
   * LOGIN FUNCTION - Sign In with Email/Password
   * ============================================================================
   */
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      console.log('🔑 Signing in...');

      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log('✅ Sign in successful!');
      navigate('/'); // Redirect to home

    } catch (error) {
      console.error('❌ Sign in error:', error);

      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            setError('Invalid email or password.');
            break;
          case 'auth/too-many-requests':
            setError('Too many failed attempts. Try again later.');
            break;
          case 'auth/user-disabled':
            setError('This account has been disabled.');
            break;
          default:
            setError(`Error: ${error.message}`);
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================================
   * UPDATE FORM DATA
   * ============================================================================
   */
  const updateForm = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  /**
   * ============================================================================
   * RENDER UI
   * ============================================================================
   */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
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
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
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
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
      </div>
    </div>
  );
};

export default CleanAuthPage;