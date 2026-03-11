import React from 'react';

const PlatformEcosystem = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">The GradToPro Ecosystem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">A holistic approach to career transformation, from learning to
            earning.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-secondary text-white p-8 rounded-2xl group hover:bg-secondary/90 transition-all cursor-default"
            data-purpose="ecosystem-card">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">01</span>
            <h4 className="text-xl font-bold mb-2">Industrial Certification</h4>
            <p className="text-gray-400 text-sm">Rigorous validation through real-world projects and code audits.</p>
          </div>
          <div
            className="bg-white p-8 rounded-2xl border border-gray-200 group hover:border-primary transition-all cursor-default"
            data-purpose="ecosystem-card">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">02</span>
            <h4 className="text-xl font-bold mb-2">Training Programs</h4>
            <p className="text-gray-600 text-sm">In-depth curricula designed and taught by industry practitioners.</p>
          </div>
          <div
            className="bg-white p-8 rounded-2xl border border-gray-200 group hover:border-primary transition-all cursor-default"
            data-purpose="ecosystem-card">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">03</span>
            <h4 className="text-xl font-bold mb-2">Expert Interviews</h4>
            <p className="text-gray-600 text-sm">Simulated mock interviews with feedback from active tech leads.</p>
          </div>
          <div
            className="bg-white p-8 rounded-2xl border border-gray-200 group hover:border-primary transition-all cursor-default"
            data-purpose="ecosystem-card">
            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">04</span>
            <h4 className="text-xl font-bold mb-2">Placement Portal</h4>
            <p className="text-gray-600 text-sm">Exclusive access to a marketplace of verified, high-quality talent.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformEcosystem;
