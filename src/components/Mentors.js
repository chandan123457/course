import React from 'react';

const Mentors = () => {
  return (
    <section className="py-24 bg-secondary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Learn From Industry Experts</h2>
          <p className="text-gray-400">Our mentors come from the world's most innovative tech companies.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
            <img alt="Sarah Chen" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              src="/image3.jpeg" />
            <h4 className="text-lg font-bold">Rohit Kumar</h4>
            <p className="text-primary text-sm font-medium mb-1">Cloud Engineer at Oracle</p>
            <p className="text-gray-400 text-xs mb-4">Expertise: AWS</p>
            <a className="inline-block text-white hover:text-primary" href="https://www.linkedin.com/in/rohit5876/?utm_source=share_via&utm_content=profile&utm_medium=member_ios"><svg className="w-6 h-6 fill-current"
                viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z">
                </path>
              </svg></a>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
            <img alt="Alex Kumar" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              src="/image2.jpeg" />
            <h4 className="text-lg font-bold">Rahul Kumar</h4>
            <p className="text-primary text-sm font-medium mb-1">Ex- Smarsh, Udaan, Thinking Stack, ITC Infotech</p>
            <p className="text-gray-400 text-xs mb-4">Expertise: Artificial Intelligence</p>
            <a className="inline-block text-white hover:text-primary" href="https://www.linkedin.com/in/rk-2903/?utm_source=share_via&utm_content=profile&utm_medium=member_ios"><svg className="w-6 h-6 fill-current"
                viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z">
                </path>
              </svg></a>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
            <img alt="Marcus R" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
              src="/image1.jpeg" />
            <h4 className="text-lg font-bold">Richa Kumari</h4>
            <p className="text-primary text-sm font-medium mb-1">Master's in Construction Technology and Management</p>
            <p className="text-gray-400 text-xs mb-4">Expertise: AutoCAD , Revit-Architecture and Primavera</p>
            <a className="inline-block text-white hover:text-primary" href="https://www.linkedin.com/in/richa-kumari-444971256/?utm_source=share_via&utm_content=profile&utm_medium=member_ios"><svg className="w-6 h-6 fill-current"
                viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z">
                </path>
              </svg></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
