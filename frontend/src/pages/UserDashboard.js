import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';

/**
 * ============================================================================
 * USER DASHBOARD - Complete Course Management
 * ============================================================================
 *
 * This dashboard shows:
 * 1. User stats (enrolled courses, certificates, etc.)
 * 2. Enrolled courses with access links
 * 3. Course progress and status
 * 4. Quick actions (browse more courses, etc.)
 *
 * Uses new backend endpoints:
 * - GET /users/dashboard/data - User stats and recent courses
 * - GET /users/courses/enrolled - All enrolled courses
 * - GET /courses/{id}/enrollment - Check enrollment status
 * ============================================================================
 */

const UserDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // State management
  const [dashboardData, setDashboardData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user dashboard data
  useEffect(() => {
    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUser]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard stats and user info
      const [dashboardResponse, coursesResponse] = await Promise.all([
        api.get('/users/dashboard/data'),
        api.get('/users/courses/enrolled')
      ]);

      setDashboardData(dashboardResponse.data.data);
      setEnrolledCourses(coursesResponse.data.data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueLearning = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleBrowseCourses = () => {
    navigate('/courses');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { user, stats } = dashboardData || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name || currentUser?.displayName || 'Student'}! 👋
                </h1>
                <p className="text-gray-600 mt-1">
                  Ready to continue your learning journey?
                </p>
              </div>
              <button
                onClick={handleBrowseCourses}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats?.enrolledCourses || 0}</p>
                <p className="text-gray-600">Enrolled Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats?.completedOrders || 0}</p>
                <p className="text-gray-600">Completed Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats?.registeredWebinars || 0}</p>
                <p className="text-gray-600">Registered Webinars</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            {enrolledCourses.length > 0 && (
              <p className="text-gray-600">{enrolledCourses.length} course(s) enrolled</p>
            )}
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(({ course, enrolledAt }) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/200';
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">by {course.teacher}</p>
                    <p className="text-gray-500 text-xs mb-4">
                      Enrolled on {formatDate(enrolledAt)}
                    </p>

                    {/* Course Status */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Course Status</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      {/* Course Duration */}
                      <div className="text-xs text-gray-500">
                        {formatDate(course.startDate)} - {formatDate(course.endDate)}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleContinueLearning(course.id)}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Continue Learning
                      </button>

                      {course.telegramLink && (
                        <a
                          href={course.telegramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                        >
                          Join Telegram Group
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="text-6xl mb-4 block">📚</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
              <p className="text-gray-600 mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <button
                onClick={handleBrowseCourses}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Explore Courses
              </button>
            </div>
          )}
        </div>

        {/* Account Info */}
        {user && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Name:</span>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <p className="text-gray-900">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-900">
                    {user.phone}
                    <span className="ml-2 text-green-600 text-sm">✓ Verified</span>
                  </p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-600">Member since:</span>
                <p className="text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;