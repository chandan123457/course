import React from 'react';

const IndustrialCertification = () => {
  return (
    <section className="py-24 bg-white" id="certifications">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span
              className="inline-block px-4 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full mb-6">LAUNCHING
              SOON</span>
            <h2 className="text-4xl font-black mb-6">Industrial Certification Programs</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our certifications aren't based on multiple-choice questions. They are earned through sweat, code, and
              architectural defense sessions. Prove your value to employers with a portfolio that speaks for itself.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-semibold">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
                End-to-End Project-based assessment
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
                Detailed GitHub repository audit
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
                Live Interview Defense (Architectural Review)
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  </svg>
                </div>
                Mentor Evaluation &amp; Verified Certificate
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <div className="relative p-8 bg-surface rounded-2xl border-4 border-dashed border-gray-300">
              <img alt="Dashboard Preview"
                className="rounded-xl shadow-lg grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg7Bk2GHd3c_HE3B5SOAqFV69HB65x9-_JcT8uL5PLBP4KZzrAVYYA3Pc303KbPjUR0vMZkDAro61j-38mpdejCne-dxqYP3bcdvLo6aH2_ePk5hNjKEODLOx5OYFfUSZf2Y7Z2WXwExzqgYlrgMEZtPasBshkVS4YiYrP2buPzT6ssEpakUWnLfybmdNT1KmLO6Vm34DzcB0Ly6ghihF_UNfw-GxBXSiSWNvtTmQyEwHM4edtG1XQc8FBEYGhA6MMqLwdknqDQgA" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialCertification;
