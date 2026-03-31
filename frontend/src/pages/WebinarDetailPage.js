import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';

const WebinarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    fetchWebinar();
    checkRegistration();
  }, [id]);

  const fetchWebinar = async () => {
    try {
      const response = await api.get(`/webinars/${id}`);
      setWebinar(response.data.data);
    } catch (error) {
      console.error('Error fetching webinar:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    try {
      const response = await api.get(`/webinars/${id}/registration`);
      if (response.data.registered) {
        setRegistered(true);
      }
    } catch (error) {
      // User not registered
    }
  };

  const handleRegister = async () => {
    setRegistering(true);

    try {
      await api.post(`/webinars/${id}/register`);
      setRegistered(true);
      alert('Registration successful! You will receive an email with joining details.');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response?.status === 400) {
        alert('You are already registered for this webinar.');
        setRegistered(true);
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    return time;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading webinar details...</div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Webinar not found</h2>
          <button
            onClick={() => navigate('/webinars')}
            className="text-indigo-600 hover:underline"
          >
            Back to Webinars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/webinars')}
          className="mb-6 text-indigo-600 hover:underline flex items-center gap-2"
        >
          ← Back to Webinars
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 overflow-hidden">
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                    FREE WEBINAR
                  </span>
                </div>
                <h1 className="text-4xl font-extrabold mb-4">{webinar.title}</h1>
                <p className="text-gray-600 text-lg mb-6 whitespace-pre-wrap">{webinar.description}</p>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4">About this Webinar</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      Join us for an engaging and informative session where you'll learn from
                      industry experts and get hands-on insights into the latest trends and
                      best practices.
                    </p>
                    <p className="text-gray-700">
                      This webinar is perfect for students, professionals, and anyone looking
                      to enhance their skills and knowledge in the field.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-2 text-yellow-800">Special Opportunity</h4>
                  <p className="text-yellow-700">
                    1 student will be selected as a teaching assistant based on performance
                    during the webinar. This is a great opportunity to gain practical
                    experience and work closely with industry experts.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-2xl font-bold mb-4">Instructor</h3>
                  <p className="text-lg font-semibold text-indigo-600">{webinar.teacher}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <div className="mb-6">
                <div className="text-4xl font-extrabold text-green-600 mb-2">FREE</div>
                <p className="text-gray-500 text-sm">No payment required</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">{formatDate(webinar.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold">{formatTime(webinar.time)}</span>
                </div>
              </div>

              {registered ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  <p className="font-bold mb-2">✓ Successfully Registered!</p>
                  <p className="text-sm">
                    You will receive an email with the webinar joining link shortly.
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {registering ? 'Registering...' : 'Register Free'}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold mb-3">What you'll get:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Live interactive session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Q&A with industry experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Certificate of participation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Networking opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Chance to become a teaching assistant</span>
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

export default WebinarDetailPage;
