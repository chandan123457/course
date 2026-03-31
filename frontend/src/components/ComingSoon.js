import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date (60 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 60);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-secondary relative overflow-hidden" id="coming-soon">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-16 h-16 border-4 border-primary/20 rounded-lg rotate-12 float-animation"></div>
        <div className="absolute bottom-1/3 right-16 w-20 h-20 border-4 border-primary/30 rounded-full float-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-primary/10 rounded-lg rotate-45 float-animation"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/20 backdrop-blur-sm rounded-full mb-8 border border-primary/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-primary font-black text-sm uppercase tracking-widest">Platform Under Development</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Something <span className="text-primary">Extraordinary</span><br />
            Is Coming Soon
          </h2>

          <p className="text-xl lg:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
            We're crafting the ultimate platform to transform aspiring professionals into industry-ready experts. 
            Get ready for a revolutionary learning experience.
          </p>

          {/* Countdown Timer */}
          <div className="mb-16">
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-8">Launch Countdown</p>
            <div className="flex justify-center gap-4 lg:gap-8 flex-wrap">
              {/* Days */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-6 lg:p-8 min-w-[120px] lg:min-w-[140px] hover:border-primary/60 transition-all hover:scale-105">
                  <div className="text-5xl lg:text-6xl font-black text-primary mb-2">{timeLeft.days}</div>
                  <div className="text-white/60 text-sm font-bold uppercase tracking-wider">Days</div>
                </div>
              </div>

              {/* Hours */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-6 lg:p-8 min-w-[120px] lg:min-w-[140px] hover:border-primary/60 transition-all hover:scale-105">
                  <div className="text-5xl lg:text-6xl font-black text-primary mb-2">{timeLeft.hours}</div>
                  <div className="text-white/60 text-sm font-bold uppercase tracking-wider">Hours</div>
                </div>
              </div>

              {/* Minutes */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-6 lg:p-8 min-w-[120px] lg:min-w-[140px] hover:border-primary/60 transition-all hover:scale-105">
                  <div className="text-5xl lg:text-6xl font-black text-primary mb-2">{timeLeft.minutes}</div>
                  <div className="text-white/60 text-sm font-bold uppercase tracking-wider">Minutes</div>
                </div>
              </div>

              {/* Seconds */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-6 lg:p-8 min-w-[120px] lg:min-w-[140px] hover:border-primary/60 transition-all hover:scale-105">
                  <div className="text-5xl lg:text-6xl font-black text-primary mb-2">{timeLeft.seconds}</div>
                  <div className="text-white/60 text-sm font-bold uppercase tracking-wider">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">Project-Based Certification</h4>
              <p className="text-gray-400 text-sm">Real-world validation through hands-on projects</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">Expert Mentorship</h4>
              <p className="text-gray-400 text-sm">Learn from industry leaders at top companies</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">Direct Placement</h4>
              <p className="text-gray-400 text-sm">Connect with hiring partners instantly</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
