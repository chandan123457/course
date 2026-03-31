import React from 'react';

const PlacementPortal = () => {
  return (
    <section className="py-24 bg-primary" id="placement">
      <div className="container mx-auto px-6">
        <div className="bg-secondary text-white rounded-[3rem] p-12 lg:p-20 overflow-hidden relative">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-black mb-6">Exclusive Placement Portal</h2>
              <p className="text-gray-400 text-lg mb-8">
                Skip the resume black hole. Our portal connects verified talent directly with HR managers who trust our
                'GradToPro' rating system.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">Top-rated
                  Candidates</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">Verified
                  Skill Ratings</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20">HR Review
                  Recordings</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-primary text-secondary font-black rounded-xl">Verified Talent Marketplace</div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 bg-primary opacity-20 blur-2xl"></div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="h-3 w-24 bg-gray-500 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span>Technical Proficiency</span>
                      <span className="text-primary font-bold">94%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[94%]"></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Project Architecture</span>
                      <span className="text-primary font-bold">88%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[88%]"></div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                    <span className="text-[10px] tracking-widest text-primary font-bold uppercase">GradToPro Badge
                      Issued</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementPortal;
