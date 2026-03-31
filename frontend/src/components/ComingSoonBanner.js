import React, { useState, useEffect } from 'react';

const ComingSoonBanner = () => {
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
    <div className="bg-gradient-to-r from-secondary via-primary to-secondary py-3 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-white font-black text-sm md:text-base uppercase tracking-wider">
              🚀 Platform Launching Soon
            </span>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
              <div className="text-white font-black text-lg md:text-xl">{timeLeft.days}</div>
              <div className="text-white/80 text-[10px] font-bold uppercase">Days</div>
            </div>
            <div className="text-white font-black text-xl">:</div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
              <div className="text-white font-black text-lg md:text-xl">{timeLeft.hours}</div>
              <div className="text-white/80 text-[10px] font-bold uppercase">Hours</div>
            </div>
            <div className="text-white font-black text-xl">:</div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
              <div className="text-white font-black text-lg md:text-xl">{timeLeft.minutes}</div>
              <div className="text-white/80 text-[10px] font-bold uppercase">Mins</div>
            </div>
            <div className="text-white font-black text-xl">:</div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
              <div className="text-white font-black text-lg md:text-xl">{timeLeft.seconds}</div>
              <div className="text-white/80 text-[10px] font-bold uppercase">Secs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBanner;
