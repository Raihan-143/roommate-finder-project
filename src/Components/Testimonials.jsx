import React from "react";
import { Fade } from "react-awesome-reveal";

const testimonials = [
  {
    name: "Sadia Rahman",
    feedback:
      "RoomMateFinder helped me find a perfect roommate in just 3 days! Totally recommend it.",
    avatar:
      "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Rifat Hossain",
    feedback:
      "As a student, this site was a life-saver! Trusted users and very easy to use.",
    avatar:
      "https://i.pravatar.cc/100?img=52",
  },
  {
    name: "Shehub Hossen",
    feedback:
      "The clean design and the filter system made it super simple to shortlist listings.",
    avatar:
      "https://i.pravatar.cc/100?img=64",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white dark:bg-gray-800 py-14 px-6">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-white">
          🗣️ What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Real stories from real people who found their match!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <Fade key={idx} triggerOnce>
            <div className="bg-indigo-50 dark:bg-gray-900 text-gray-700 dark:text-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full border-4 border-indigo-300 mb-4"
              />
              <p className="italic text-sm mb-3">"{t.feedback}"</p>
              <h4 className="text-lg font-semibold">{t.name}</h4>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
