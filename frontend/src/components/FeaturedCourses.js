import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses?limit=3');
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#E9EAEC]">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4B61A] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#E9EAEC]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E4B61A]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#E4B61A] rounded-full"></span>
            <span className="text-[#0F1A2E] font-bold text-sm uppercase tracking-wider">Featured Programs</span>
          </div>
          <h2 className="text-4xl font-black text-[#0F1A2E] mb-4">Training Programs</h2>
          <p className="text-[#0F1A2E]/60 text-lg max-w-2xl mx-auto">
            Industry-focused programs designed to level up your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#0F1A2E]/5"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E]/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F1A2E] mb-2 line-clamp-2 group-hover:text-[#E4B61A] transition-colors">{course.title}</h3>
                <p className="text-[#0F1A2E]/60 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#0F1A2E]/50">By {course.teacher}</span>
                  <span className="text-2xl font-black text-[#0F1A2E]">₹{course.price}</span>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="block w-full bg-[#0F1A2E] text-white text-center py-3 rounded-xl font-bold hover:bg-[#E4B61A] hover:text-[#0F1A2E] transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-block bg-[#E4B61A] text-[#0F1A2E] px-8 py-4 rounded-xl font-black hover:bg-[#d4a610] transition-all hover:shadow-lg hover:-translate-y-1"
          >
            View All Training Programs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
