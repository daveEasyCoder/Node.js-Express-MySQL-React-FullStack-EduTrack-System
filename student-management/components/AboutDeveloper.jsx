import React from 'react';

const AboutDeveloper = () => {
  return (
    <div className="sm:ml-50 pt-20 min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-5xl w-full overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:p-10 p-6 gap-8">
          <img
            src="/pic.webp"
            alt="Developer"
            className="w-48 h-48 rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="text-center md:text-left space-y-4">
            <h1 className="about-name text-4xl font-bold text-gray-800">Dawit Tiruneh</h1>
            <h2 className="text-xl text-blue-600 font-semibold">Full-Stack Developer & Software Engineering Student</h2>
            <p className="aboute-developer-desc text-gray-600 ">
              I'm a passionate software developer from Ethiopia, focused on building modern web and mobile applications. 
              I enjoy working with the latest technologies like React, Node.js, Express, and MySQL to build scalable and efficient systems.
              This EduTrack System is a full-stack project I built to streamline student registration, course tracking, and enrollment management.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-50 border-t border-t-gray-300 px-10 py-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Skills & Technologies</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-gray-700">
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MySQL</li>
            <li>MongoDB</li>
            <li>Tailwind CSS</li>
            <li>JavaScript</li>
            <li>HTML & CSS</li>
            <li>Git & GitHub</li>
            <li>REST APIs</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-white border-t border-t-gray-300 px-10 py-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact & Links</h3>
          <p className="text-gray-700 mb-2">
            📧 Email: <a href="mailto:dawittechguru@gmail.com" className="text-blue-600 hover:underline">dawittechguru.com</a>
          </p>
          <p className="text-gray-700 mb-2">
            💻 GitHub: <a href="https://github.com/daveEasyCoder" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">github.com/daveEasyCoder</a>
          </p>
          <p className="text-gray-700">
          📱 Telegram: <a href="https://t.me/davetechguru" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">@davetechguru</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
