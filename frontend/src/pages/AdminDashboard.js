import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin, createAdminApi } from '../contexts/AdminContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminUser, adminLogout } = useAdmin();
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    totalWebinars: 0,
    activeWebinars: 0,
  });
  const [loading, setLoading] = useState(true);

  const adminApi = createAdminApi();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminApi.get('/admin/dashboard/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {adminUser?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">W</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Webinars</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalWebinars}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Live Webinars</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeWebinars}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Management */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Management</h3>
              <p className="text-gray-600 mb-6">
                Create, edit, and manage your premium courses. Set pricing, upload content, and manage enrollments.
              </p>
              <div className="space-y-3">
                <Link
                  to="/admin/courses"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Courses
                </Link>
                <Link
                  to="/admin/courses/create"
                  className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create New Course
                </Link>
              </div>
            </div>
          </div>

          {/* Webinar Management */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Webinar Management</h3>
              <p className="text-gray-600 mb-6">
                Schedule free webinars, manage registrations, and engage with your audience through live sessions.
              </p>
              <div className="space-y-3">
                <Link
                  to="/admin/webinars"
                  className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View All Webinars
                </Link>
                <Link
                  to="/admin/webinars/create"
                  className="block w-full bg-indigo-600 text-white text-center py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Schedule New Webinar
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/admin/courses/create"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-blue-500 text-2xl mb-2">📚</div>
              <div className="font-medium">Add Course</div>
            </Link>
            <Link
              to="/admin/webinars/create"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-purple-500 text-2xl mb-2">🎥</div>
              <div className="font-medium">Schedule Webinar</div>
            </Link>
            <Link
              to="/"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-green-500 text-2xl mb-2">🌐</div>
              <div className="font-medium">View Website</div>
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-orange-500 text-2xl mb-2">📊</div>
              <div className="font-medium">Analytics</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;