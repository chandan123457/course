import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';
import useRazorpay from '../hooks/useRazorpay';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoaded: razorpayLoaded, isLoading: razorpayLoading, error: razorpayError } = useRazorpay();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [telegramLink, setTelegramLink] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  // Check enrollment after course is loaded
  useEffect(() => {
    if (course) {
      checkEnrollment();
    }
  }, [course]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await api.get(`/users/courses/${id}/enrollment`);
      if (response.data.data.enrolled) {
        setEnrolled(true);
        // Set telegram link from course data if available
        if (course?.telegramLink) {
          setTelegramLink(course.telegramLink);
        }
      }
    } catch (error) {
      // User not enrolled
    }
  };

  const handleEnroll = async () => {
    // Check if Razorpay is loaded
    if (!razorpayLoaded) {
      alert('Payment system is loading. Please wait a moment and try again.');
      return;
    }

    if (razorpayError) {
      alert('Payment system failed to load. Please refresh the page and try again.');
      return;
    }

    setEnrolling(true);

    try {
      // Create order
      const orderResponse = await api.post('/payments/create-order', {
        courseId: parseInt(id),
      });

      const { orderId, amount, currency, keyId } = orderResponse.data.data;

      // Razorpay checkout options
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'GradToPro',
        description: course.title,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Payment successful
            setEnrolled(true);
            // Set telegram link from course data
            if (course?.telegramLink) {
              setTelegramLink(course.telegramLink);
            }
            alert('Payment successful! You are now enrolled in the course.');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          } finally {
            setEnrolling(false);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#4F46E5',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed. Please try again.');
        setEnrolling(false);
      });
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to initialize payment. Please try again.');
      setEnrolling(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="text-indigo-600 hover:underline"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/courses')}
          className="mb-6 text-indigo-600 hover:underline flex items-center gap-2"
        >
          ← Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
                <p className="text-gray-600 text-lg mb-6">{course.description}</p>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4">Course Syllabus</h3>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700">{course.syllabus}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-2xl font-bold mb-4">Instructor</h3>
                  <p className="text-lg font-semibold text-indigo-600">{course.teacher}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <div className="mb-6">
                <div className="text-4xl font-extrabold text-indigo-600 mb-2">
                  ₹{course.price}
                </div>
                <p className="text-gray-500 text-sm">One-time payment</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-semibold">{formatDate(course.startDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">End Date</span>
                  <span className="font-semibold">{formatDate(course.endDate)}</span>
                </div>
              </div>

              {enrolled ? (
                <div className="space-y-4">
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    ✓ You are enrolled in this course
                  </div>
                  {telegramLink && (
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Next Steps:</h4>
                      <ul className="text-sm space-y-2 mb-4">
                        <li>• Join the Telegram group to connect with peers</li>
                        <li>• Access course materials and assignments</li>
                        <li>• Attend live sessions and webinars</li>
                      </ul>
                      <a
                        href={telegramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                      >
                        Join Telegram Group
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling || razorpayLoading || !razorpayLoaded}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {enrolling
                    ? 'Processing...'
                    : razorpayLoading
                    ? 'Loading Payment System...'
                    : 'Enroll Now'}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold mb-3">What you'll get:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Lifetime access to course materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Live sessions and webinars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Industry-recognized certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Dedicated Telegram community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Career guidance and support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
