import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';

const FeaturedWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const response = await api.get('/webinars?limit=3');
      setWebinars(response.data.data || []);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    } finally {
      setLoading(false);
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">Loading webinars...</div>
        </div>
      </section>
    );
  }

  if (webinars.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Upcoming Free Webinars</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join expert-led sessions and gain valuable industry insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FREE
                  </span>
                  <span className="text-xs text-gray-500">{formatDate(webinar.date)}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{webinar.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {webinar.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">By {webinar.teacher}</span>
                  <span className="text-sm font-semibold text-indigo-600">
                    {formatTime(webinar.time)}
                  </span>
                </div>
                <Link
                  to={`/webinars/${webinar.id}`}
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Register Free
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/webinars"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all hover:shadow-lg"
          >
            View All Webinars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWebinars;
