import React from 'react';

const CareerJourney = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">Your Path to Industry Readiness</h2>
          <p className="text-gray-600">A structured journey from beginner to professional.</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div
                className="w-12 h-12 bg-primary text-secondary font-black rounded-full flex items-center justify-center mx-auto mb-6">
                1</div>
              <h4 className="font-black mb-2 uppercase tracking-tight">Learn</h4>
              <p className="text-xs text-gray-500">Master deep technical domains via experts.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div
                className="w-12 h-12 bg-primary text-secondary font-black rounded-full flex items-center justify-center mx-auto mb-6">
                2</div>
              <h4 className="font-black mb-2 uppercase tracking-tight">Build</h4>
              <p className="text-xs text-gray-500">Construct real-world production-grade apps.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div
                className="w-12 h-12 bg-primary text-secondary font-black rounded-full flex items-center justify-center mx-auto mb-6">
                3</div>
              <h4 className="font-black mb-2 uppercase tracking-tight">Validate</h4>
              <p className="text-xs text-gray-500">Undergo code audits &amp; architectural defense.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div
                className="w-12 h-12 bg-primary text-secondary font-black rounded-full flex items-center justify-center mx-auto mb-6">
                4</div>
              <h4 className="font-black mb-2 uppercase tracking-tight">Get Rated</h4>
              <p className="text-xs text-gray-500">Receive verified industry-standard scores.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div
                className="w-12 h-12 bg-primary text-secondary font-black rounded-full flex items-center justify-center mx-auto mb-6">
                5</div>
              <h4 className="font-black mb-2 uppercase tracking-tight">Get Hired</h4>
              <p className="text-xs text-gray-500">Direct access to hiring partners &amp; opportunities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerJourney;
