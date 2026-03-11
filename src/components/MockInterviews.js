import React from 'react';

const MockInterviews = () => {
  return (
    <section className="py-24" id="interviews">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2">
            <span className="inline-block px-4 py-1 bg-primary text-secondary font-bold text-xs rounded-full mb-6">LAUNCHING
              SOON</span>
            <h2 className="text-4xl font-black mb-6">On-Demand Mock Interviews</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Don't practice on your dream company. Practice with us first. Get raw, honest, and constructive feedback
              from engineers who actually conduct interviews at top-tier firms.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="font-black text-2xl text-primary">30m</div>
                <div className="font-bold text-sm">Deep Sessions</div>
              </div>
              <div className="space-y-2">
                <div className="font-black text-2xl text-primary">Live</div>
                <div className="font-bold text-sm">Feedback Loop</div>
              </div>
              <div className="space-y-2">
                <div className="font-black text-2xl text-primary">Detailed</div>
                <div className="font-bold text-sm">Skill Reports</div>
              </div>
              <div className="space-y-2">
                <div className="font-black text-2xl text-primary">Behavioral</div>
                <div className="font-bold text-sm">Coaching</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <img alt="Mock Interview Interface" className="rounded-xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr2rWtTKNrkDpwY_Fr04xy4CcSdEMh4Lq5MqPv0W53NC5x9N4Qfn5WXgOJoUCoUepUtK5d_cSLt8Uw2aOJzKIT4eGXQrLQ8xVmJYhFOc7tobwhEkypiEBDkbxBS8iUS279tS82iffKohNa5gmkIxp_OlmAXpNLvYMaI-JiOzX-MAJjLl18bDd8T6eX-wY2G3NCGraFL382bPOiVX2JpkYNOsGU4DMNqAzHcfaDTiFQFijf5CcoOPjPBryC2UM2GwbJLiIr7qdq2c8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockInterviews;
