import React from 'react';

const EarlyAccess = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-24" id="early-access">
      <div className="container mx-auto px-6">
        <div className="bg-primary p-12 lg:p-24 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black mb-8">Join the Industry-Ready Ecosystem</h2>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-secondary/10 rounded-full mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
              <span className="text-secondary font-bold text-sm uppercase tracking-wide">Platform Launches in 60 Days</span>
            </div>
            <p className="text-lg font-medium mb-10 text-secondary/80">
              Be the first to know when our certification cohorts and placement portals go live. Early access members
              get priority evaluation and discounted pricing.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
              <input className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-secondary text-lg"
                placeholder="Enter your work email" required type="email" />
              <button
                className="bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all"
                type="submit">Join Early Access</button>
            </form>
            <p className="mt-6 text-sm font-semibold opacity-60">No spam. Only high-value industry updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
