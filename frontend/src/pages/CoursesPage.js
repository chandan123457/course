import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { useAuth } from '../contexts/AuthContext';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E9EAEC]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4B61A] mx-auto mb-4"></div>
          <p className="text-[#0F1A2E] font-medium">Loading training programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9EAEC] py-16">
      <div className="container mx-auto px-6">

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E4B61A]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#E4B61A] rounded-full"></span>
            <span className="text-[#0F1A2E] font-bold text-sm uppercase tracking-wider">Industry-Ready Programs</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 text-[#0F1A2E] tracking-tight">
            Training <span className="text-[#E4B61A]">Programs</span>
          </h1>
          <p className="text-[#0F1A2E]/70 text-lg max-w-3xl mx-auto leading-relaxed">
            Transform your career with industry-leading programs designed by experts.
            Get hands-on experience and land your dream job.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-[#E4B61A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📚</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0F1A2E] mb-3">No programs available</h3>
            <p className="text-[#0F1A2E]/60 text-lg">New training programs coming soon. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-[#0F1A2E] text-xs font-bold px-2.5 py-1 rounded-full">
                      {course.isActive ? 'Enrolling Now' : 'Coming Soon'}
                    </span>
                  </div>
                  {/* Bookmark icon */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                    <svg className="w-4 h-4 text-[#0F1A2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[#0F1A2E] font-bold text-base leading-snug mb-1.5 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Meta rows */}
                  <div className="space-y-2 mb-5 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {course.startDate ? formatDate(course.startDate) : 'TBA'}
                        {course.endDate ? ` – ${formatDate(course.endDate)}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>Professional Certificate</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{course.teacher || 'Expert Instructor'}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/courses/${course.id}`}
                    className="block w-full bg-[#E4B61A] text-[#0F1A2E] text-center py-3 rounded-xl font-bold text-sm hover:bg-[#d4a610] transition-all duration-200 shadow-sm"
                  >
                    {currentUser ? 'View Details' : 'Enroll Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
