import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';

/**
 * ============================================================================
 * USER DASHBOARD - Premium Training Program Management
 * ============================================================================
 */

const UserDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUser]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
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
      <div className="min-h-screen flex items-center justify-center bg-[#E9EAEC]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4B61A] mx-auto mb-4"></div>
          <p className="text-[#0F1A2E] font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E9EAEC]">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-[#0F1A2E] mb-2">Something went wrong</h2>
          <p className="text-[#0F1A2E]/60 mb-6">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-[#E4B61A] text-[#0F1A2E] px-6 py-3 rounded-xl font-bold hover:bg-[#d4a610] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { user, stats } = dashboardData || {};

  return (
    <div className="min-h-screen bg-[#E9EAEC]">
      {/* Hero Header */}
      <div className="bg-[#0F1A2E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#E4B61A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E4B61A] rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E4B61A]/20 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#E4B61A] rounded-full animate-pulse"></span>
                <span className="text-[#E4B61A] font-bold text-xs uppercase tracking-wider">Dashboard</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
                Welcome back, {user?.name || currentUser?.displayName || 'Student'}! 👋
              </h1>
              <p className="text-white/60 text-lg">
                Ready to continue your learning journey?
              </p>
            </div>
            <button
              onClick={handleBrowseCourses}
              className="bg-[#E4B61A] text-[#0F1A2E] px-6 py-3 rounded-xl font-bold hover:bg-[#d4a610] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 -mt-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#0F1A2E]/5 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#E4B61A]/10 rounded-xl flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
              <div>
                <p className="text-3xl font-black text-[#0F1A2E]">{stats?.enrolledCourses || 0}</p>
                <p className="text-[#0F1A2E]/50 font-medium">Enrolled Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#0F1A2E]/5 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
              <div>
                <p className="text-3xl font-black text-[#0F1A2E]">{stats?.completedOrders || 0}</p>
                <p className="text-[#0F1A2E]/50 font-medium">Completed Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#0F1A2E]/5 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <div>
                <p className="text-3xl font-black text-[#0F1A2E]">{stats?.registeredWebinars || 0}</p>
                <p className="text-[#0F1A2E]/50 font-medium">Registered Webinars</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Training Programs Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#0F1A2E]">My Courses</h2>
              {enrolledCourses.length > 0 && (
                <p className="text-[#0F1A2E]/50 mt-1">{enrolledCourses.length} program(s) enrolled</p>
              )}
            </div>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrolledCourses.map(({ course, enrolledAt }) => (
                <div 
                  key={course.id} 
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-[#0F1A2E]/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Course Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=Course+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E]/70 to-transparent"></div>
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        course.isActive
                          ? 'bg-green-500 text-white'
                          : 'bg-[#E4B61A] text-[#0F1A2E]'
                      }`}>
                        {course.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {/* Enrolled Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-[#0F1A2E] text-xs font-bold rounded-full">
                        ✓ Enrolled
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0F1A2E] mb-2 line-clamp-2 group-hover:text-[#E4B61A] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[#0F1A2E]/60 text-sm mb-4">
                      by <span className="font-semibold">{course.teacher}</span>
                    </p>

                    {/* Course Info */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between text-[#0F1A2E]/50">
                        <span>Enrolled on</span>
                        <span className="font-medium text-[#0F1A2E]">{formatDate(enrolledAt)}</span>
                      </div>
                      <div className="flex justify-between text-[#0F1A2E]/50">
                        <span>Duration</span>
                        <span className="font-medium text-[#0F1A2E]">
                          {formatDate(course.startDate)} - {formatDate(course.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleContinueLearning(course.id)}
                        className="w-full bg-[#0F1A2E] text-white py-3 px-4 rounded-xl font-bold hover:bg-[#E4B61A] hover:text-[#0F1A2E] transition-all duration-300"
                      >
                        Continue Learning →
                      </button>

                      {course.telegramLink && (
                        <a
                          href={course.telegramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.12.098.153.228.166.331.015.136.033.393.019.598z"/>
                          </svg>
                          Join Telegram Group
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-[#0F1A2E]/5">
              <div className="w-24 h-24 bg-[#E4B61A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0F1A2E] mb-3">No courses enrolled yet</h3>
              <p className="text-[#0F1A2E]/60 mb-8 max-w-md mx-auto">
                Start your learning journey by enrolling in a course
              </p>
              <button
                onClick={handleBrowseCourses}
                className="bg-[#E4B61A] text-[#0F1A2E] px-8 py-4 rounded-xl font-bold hover:bg-[#d4a610] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Explore Courses
              </button>
            </div>
          )}
        </div>

        {/* Account Info Card */}
        {user && (
          <div className="bg-white rounded-2xl shadow-lg border border-[#0F1A2E]/5 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E4B61A]/10 rounded-xl flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F1A2E]">Account Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-[#E9EAEC] rounded-xl">
                <span className="text-xs font-bold text-[#0F1A2E]/50 uppercase tracking-wider">Name</span>
                <p className="text-[#0F1A2E] font-semibold mt-1">{user.name}</p>
              </div>
              <div className="p-4 bg-[#E9EAEC] rounded-xl">
                <span className="text-xs font-bold text-[#0F1A2E]/50 uppercase tracking-wider">Email</span>
                <p className="text-[#0F1A2E] font-semibold mt-1">{user.email}</p>
              </div>
              {user.phone && (
                <div className="p-4 bg-[#E9EAEC] rounded-xl">
                  <span className="text-xs font-bold text-[#0F1A2E]/50 uppercase tracking-wider">Phone</span>
                  <p className="text-[#0F1A2E] font-semibold mt-1">
                    {user.phone}
                    <span className="ml-2 text-green-600 text-xs font-bold">✓ Verified</span>
                  </p>
                </div>
              )}
              <div className="p-4 bg-[#E9EAEC] rounded-xl">
                <span className="text-xs font-bold text-[#0F1A2E]/50 uppercase tracking-wider">Member Since</span>
                <p className="text-[#0F1A2E] font-semibold mt-1">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;