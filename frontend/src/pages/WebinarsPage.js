import React, { useEffect, useState } from 'react';
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
    const loadWebinars = async () => {
      try {
        const response = await api.get('/webinars');
        setWebinars(response.data.data || []);
      } catch (error) {
        console.error('Error fetching webinars:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWebinars();
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
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [successNotice]);

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
      setSuccessNotice('Registered successfully.');
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
      <div className="min-h-screen bg-[#F0F1F3] flex items-center justify-center">
        <div className="rounded-[28px] border border-[#0F1A2E]/8 bg-white px-8 py-7 text-center shadow-[0_24px_70px_rgba(15,26,46,0.08)]">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-[#0F1A2E]/10 border-t-[#E4B61A]"></div>
          <p className="text-sm font-semibold text-[#0F1A2E]">Loading webinars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F1F3] text-[#0F1A2E]">
      {successNotice ? (
        <div className="fixed right-4 top-24 z-[120] sm:right-6">
          <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-700 shadow-[0_20px_50px_rgba(15,26,46,0.14)]">
            {successNotice}
          </div>
        </div>
      ) : null}

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(228,182,26,0.14),transparent_55%)]"></div>
        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-8 lg:px-8 lg:pt-14 lg:pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E4B61A]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#0F1A2E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4B61A]"></span>
              Free Expert Sessions
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-[#0F1A2E] sm:text-5xl">
              Live <span className="text-[#E4B61A]">Webinars</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#0F1A2E]/58 sm:text-base">
              Join expert-led sessions and stay ahead in your career. Learn from industry
              professionals and get your questions answered live.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[32px] border border-[#0F1A2E]/8 bg-white shadow-[0_26px_80px_rgba(15,26,46,0.08)]">
            <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
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
                    Webinar registrations are now live. Full access will be provided on the
                    session date.
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#0F1A2E]/58">
                    Secure your seat by completing a quick registration. Your details are
                    handled securely and used to share access before the event begins.
                  </p>
                </div>
              </div>

              <div className="rounded-[26px] border border-[#E4B61A]/30 bg-[linear-gradient(135deg,rgba(228,182,26,0.16),rgba(228,182,26,0.04))] px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0F1A2E]/55">
                  CURRENT STATUS
                </p>
                <p className="mt-2 text-base font-bold text-[#0F1A2E]">
                  Registration is currently open.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#0F1A2E]/60">
                  Click "Register Now" on any webinar card to reserve your seat instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8 lg:pb-16">
        {webinars.length === 0 ? (
          <div className="rounded-[32px] border border-[#0F1A2E]/8 bg-white px-6 py-16 text-center shadow-[0_24px_80px_rgba(15,26,46,0.06)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#E4B61A]/10 text-3xl">
              🎙️
            </div>
            <h3 className="text-xl font-bold text-[#0F1A2E]">No webinars available yet</h3>
            <p className="mt-2 text-sm text-[#0F1A2E]/50">
              New sessions coming soon. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {webinars.map((webinar) => (
              <article
                key={webinar.id}
                className="group flex flex-col overflow-hidden rounded-[28px] border border-[#0F1A2E]/8 bg-white shadow-[0_12px_35px_rgba(15,26,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,26,46,0.1)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={webinar.image}
                    alt={webinar.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2E]/30 to-transparent"></div>
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F1A2E] shadow-sm backdrop-blur-sm">
                    Free Webinar
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[17px] font-bold leading-snug text-[#0F1A2E] line-clamp-2">
                    {webinar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#0F1A2E]/50 line-clamp-2">
                    {webinar.description}
                  </p>

                  <div className="mt-5 space-y-2.5 text-xs text-[#0F1A2E]/55">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E4B61A]"></span>
                      <span>{formatDate(webinar.date)} • {webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F1A2E]/25"></span>
                      <span>Live Session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F1A2E]/25"></span>
                      <span>{webinar.teacher}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openRegistrationModal(webinar)}
                    className="mt-6 w-full rounded-2xl bg-[#E4B61A] px-4 py-3 text-sm font-bold text-[#0F1A2E] transition-colors hover:bg-[#d7aa12]"
                  >
                    Register Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedWebinar ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close registration modal"
            className="absolute inset-0 bg-[#07111F]/56 backdrop-blur-sm"
            onClick={closeRegistrationModal}
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#0F1A2E]/8 bg-[#F0F1F3] shadow-[0_28px_100px_rgba(0,0,0,0.24)]">
            <div className="border-b border-[#0F1A2E]/8 bg-white px-6 py-6 sm:px-8">
              <h2 className="text-2xl font-black tracking-tight text-[#0F1A2E] sm:text-3xl">
                Register for {selectedWebinar.title}
              </h2>
            </div>

            <div className="max-h-[calc(90vh-7rem)] overflow-y-auto px-6 py-7 sm:px-8">
              <form
                onSubmit={handleRegister}
                className="grid gap-5 rounded-[28px] border border-[#0F1A2E]/8 bg-white p-5 shadow-[0_16px_40px_rgba(15,26,46,0.06)] md:grid-cols-2 sm:p-6"
              >
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                    Full Name
                  </span>
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
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                    Email Address
                  </span>
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
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                    Phone Number
                  </span>
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
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                    College / Profession
                  </span>
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
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                    Course Interest
                  </span>
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
                  <span className="mb-2 block text-sm font-semibold text-[#0F1A2E]">
                    Experience Level
                  </span>
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
                    How did you hear about us?{' '}
                    <span className="font-normal text-[#0F1A2E]/45">(Optional)</span>
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
                    Questions for the webinar{' '}
                    <span className="font-normal text-[#0F1A2E]/45">(Optional)</span>
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
