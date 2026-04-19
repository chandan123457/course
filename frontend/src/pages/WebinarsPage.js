import React, { useState, useEffect } from 'react';
import api from '../config/api';

const COURSE_OPTIONS = [
  'Web Development',
  'DevOps',
  'Blockchain',
  'Data Science',
  'Others',
];

const EXPERIENCE_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

const WebinarsPage = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    collegeOrProfession: '',
    courseInterest: COURSE_OPTIONS[0],
    experienceLevel: EXPERIENCE_OPTIONS[0],
    referralSource: '',
    questions: '',
  });

  useEffect(() => {
    fetchWebinars();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedWebinar ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedWebinar]);

  useEffect(() => {
    if (!successNotice) return undefined;

    const timeoutId = window.setTimeout(() => {
      setSuccessNotice('');
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [successNotice]);

  const fetchWebinars = async () => {
    try {
      const response = await api.get('/webinars');
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
      month: 'short',
      day: 'numeric',
    });
  };

  const openRegistrationModal = (webinar) => {
    setSelectedWebinar(webinar);
    setSubmitError('');
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      collegeOrProfession: '',
      courseInterest: COURSE_OPTIONS[0],
      experienceLevel: EXPERIENCE_OPTIONS[0],
      referralSource: '',
      questions: '',
    });
  };

  const closeRegistrationModal = () => {
    setSelectedWebinar(null);
    setRegistering(false);
    setSubmitError('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!selectedWebinar) return;

    setRegistering(true);
    setSubmitError('');

    try {
      await api.post(`/webinars/${selectedWebinar.id}/register`, formData);
      closeRegistrationModal();
      setSuccessNotice('Registration submitted successfully.');
    } catch (error) {
      console.error('Registration failed:', error);
      const detailMessage = error.response?.data?.details
        ?.map((detail) => detail.message)
        ?.filter(Boolean)
        ?.join(' ');

      setSubmitError(
        detailMessage ||
        error.response?.data?.message ||
        'Unable to submit right now. Please try again in a moment.'
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F1F3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4B61A] mx-auto mb-4"></div>
          <p className="text-[#0F1A2E] font-medium">Loading webinars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F1F3]">
      {successNotice ? (
        <div className="fixed right-4 top-24 z-[110] sm:right-6">
          <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-700 shadow-[0_20px_50px_rgba(15,26,46,0.14)]">
            {successNotice}
          </div>
        </div>
      ) : null}

      {/* Page Header */}
      <div className="container mx-auto px-6 pt-10 pb-6 text-center">
        <span className="inline-flex items-center gap-2 bg-[#E4B61A]/10 text-[#0F1A2E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-[#E4B61A] rounded-full"></span>
          Free Expert Sessions
        </span>
        <h1 className="text-3xl lg:text-4xl font-black text-[#0F1A2E] mb-3 tracking-tight">
          Live <span className="text-[#E4B61A]">Webinars</span>
        </h1>
        <p className="text-[#0F1A2E]/55 text-sm max-w-xl mx-auto leading-relaxed">
          Join our expert-led webinars and stay ahead in your career.
          Learn from industry professionals and get your questions answered live.
        </p>

        <div className="mt-7 mx-auto max-w-4xl overflow-hidden rounded-[30px] border border-[#0F1A2E]/8 bg-white shadow-[0_24px_80px_rgba(15,26,46,0.08)]">
          <div className="grid gap-5 px-5 py-5 text-left sm:px-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#E4B61A]/12 shadow-inner">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E4B61A]/45"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#E4B61A]"></span>
                </span>
              </div>
              <div>
                <div className="inline-flex items-center rounded-full bg-[#0F1A2E] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                  Coming Soon
                </div>
                <h2 className="mt-3 text-lg font-black tracking-tight text-[#0F1A2E] sm:text-xl">
                  REGISTRATIONS OPEN
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0F1A2E]/58">
                  Webinar registrations are now live. Full access will be provided on the session date.
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0F1A2E]/58">
                  Secure your seat by completing a quick registration. Your details are handled securely and used to share access before the event begins.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#E4B61A]/30 bg-[linear-gradient(135deg,rgba(228,182,26,0.18),rgba(228,182,26,0.05))] px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0F1A2E]/55">CURRENT STATUS</p>
              <p className="mt-2 text-base font-bold text-[#0F1A2E]">Registration is currently open.</p>
              <p className="mt-2 text-sm leading-6 text-[#0F1A2E]/60">
                Click "Register Now" on any webinar card to reserve your seat instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-10">
        {webinars.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#E4B61A]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-4xl">🎙️</span>
            </div>
            <h3 className="text-xl font-bold text-[#0F1A2E] mb-2">No webinars available yet</h3>
            <p className="text-[#0F1A2E]/50">New sessions coming soon. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={webinar.image}
                    alt={webinar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0F1A2E] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    Free Webinar
                  </span>
                  {/* Bookmark */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                    <svg className="w-4 h-4 text-[#0F1A2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[#0F1A2E] font-bold text-[15px] leading-snug mb-1 line-clamp-2">
                    {webinar.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {webinar.description}
                  </p>

                  {/* Meta */}
                  <div className="space-y-2 mb-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(webinar.date)} • {webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                      <span>Live Session</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{webinar.teacher}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={() => openRegistrationModal(webinar)}
                    className="block w-full rounded-xl bg-[#E4B61A] py-2.5 text-center text-sm font-bold text-[#0F1A2E] transition-colors hover:bg-[#d4a610]"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedWebinar ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close registration modal"
            className="absolute inset-0 bg-[#07111F]/70 backdrop-blur-sm"
            onClick={closeRegistrationModal}
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[32px] border border-[#0F1A2E]/8 bg-[#F0F1F3] shadow-[0_28px_100px_rgba(0,0,0,0.24)]">
            <div className="border-b border-[#0F1A2E]/8 bg-white px-6 py-6 sm:px-8">
              <h2 className="text-2xl font-black tracking-tight text-[#0F1A2E] sm:text-3xl">
                Register for {selectedWebinar.title}
              </h2>
            </div>

            <div className="max-h-[calc(90vh-12rem)] overflow-y-auto px-6 py-7 sm:px-8">
              <form onSubmit={handleRegister} className="grid gap-5 rounded-[28px] border border-[#0F1A2E]/8 bg-white p-5 shadow-[0_16px_40px_rgba(15,26,46,0.06)] md:grid-cols-2 sm:p-6">
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                  />
                </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">Phone Number</span>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">College / Profession</span>
                    <input
                      type="text"
                      name="collegeOrProfession"
                      value={formData.collegeOrProfession}
                      onChange={handleInputChange}
                      placeholder="Your college name or current role"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">Course Interest</span>
                    <select
                      name="courseInterest"
                      value={formData.courseInterest}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                    >
                      {COURSE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">Experience Level</span>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                    >
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                      How did you hear about us? <span className="font-normal text-[#0F1A2E]/45">(Optional)</span>
                    </span>
                    <input
                      type="text"
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleInputChange}
                      placeholder="LinkedIn, Instagram, friend, college group..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                      Questions for the webinar <span className="font-normal text-[#0F1A2E]/45">(Optional)</span>
                    </span>
                    <textarea
                      name="questions"
                      value={formData.questions}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us what you want covered during the webinar."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0F1A2E] outline-none transition focus:border-[#E4B61A] focus:bg-white focus:ring-4 focus:ring-[#E4B61A]/15"
                    />
                  </label>

                {submitError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 md:col-span-2">
                    {submitError}
                  </div>
                ) : null}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={registering}
                    className="w-full rounded-2xl bg-[#0F1A2E] px-5 py-4 text-base font-bold text-white transition hover:bg-[#162846] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {registering ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WebinarsPage;
