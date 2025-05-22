// src/components/HowItWorks.jsx

import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaUserEdit, FaSearchLocation, FaHandshake } from 'react-icons/fa';

const steps = [
  {
    id: 1,
    title: "Create Your Profile",
    desc: "Sign up and add your preferences, location, and budget to get personalized matches.",
    icon: <FaUserEdit className="text-4xl text-indigo-600" />,
  },
  {
    id: 2,
    title: "Browse Roommates",
    desc: "Explore listings that match your lifestyle, location, and budget in just a few clicks.",
    icon: <FaSearchLocation className="text-4xl text-indigo-600" />,
  },
  {
    id: 3,
    title: "Connect & Chat",
    desc: "Easily connect with potential roommates and finalize your decision with confidence.",
    icon: <FaHandshake className="text-4xl text-indigo-600" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-indigo-50 dark:bg-gray-900 py-14 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-white">
          🛠️ How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto">
          Just follow these three simple steps and find your ideal roommate effortlessly.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <Fade key={step.id} direction="up" triggerOnce delay={index * 150}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl p-6 text-center transition">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                {step.desc}
              </p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
