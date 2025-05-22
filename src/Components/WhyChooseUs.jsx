import React from "react";
import { FaShieldAlt, FaUserCheck, FaHandshake } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaShieldAlt className="text-4xl text-indigo-600 dark:text-indigo-400 mb-3" />,
      title: "Verified & Secure",
      desc: "All users and listings are manually verified to ensure your safety and trust.",
    },
    {
      icon: <FaUserCheck className="text-4xl text-indigo-600 dark:text-indigo-400 mb-3" />,
      title: "User-Friendly Experience",
      desc: "Our platform is designed to help you easily browse, connect, and chat with roommates.",
    },
    {
      icon: <FaHandshake className="text-4xl text-indigo-600 dark:text-indigo-400 mb-3" />,
      title: "Community-Driven",
      desc: "We believe in building a supportive and respectful community for all users.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400">
          💡 Why Choose Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here’s why thousands trust RoomMateFinder every day!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((item, idx) => (
          <Slide direction="up" key={idx} triggerOnce>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center border border-gray-100 dark:border-gray-700">
              {item.icon}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{item.desc}</p>
            </div>
          </Slide>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
