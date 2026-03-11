import React from 'react';

const ProblemSection = () => {
  return (
    <section className="py-24 bg-white/50" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl lg:text-4xl font-black mb-6">The Gap Between Education and Industry</h2>
          <p className="text-lg text-gray-600">Traditional education often leaves a void in practical application. We solve
            the three biggest hurdles facing new talent today.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Theory Heavy Learning</h3>
            <p className="text-gray-600">Degrees focus on concepts, but companies hire for capabilities. Academic syllabi
              struggle to keep pace with tech stacks.</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Lack of Project Validation</h3>
            <p className="text-gray-600">Standard certificates don't prove you can build. Recruiters need evidence of clean
              code and architectural thinking.</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Weak Interview Preparation</h3>
            <p className="text-gray-600">Great engineers often fail interviews due to nerves or lack of technical
              articulation. Soft skills are rarely taught.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
