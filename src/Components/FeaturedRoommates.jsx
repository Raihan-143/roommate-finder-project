import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import roommatesData from "../data/featuredRoommates.json";

const FeaturedRoommates = () => {
  const [roommates, setRoommates] = useState([]);

  useEffect(() => {
    setRoommates(roommatesData.slice(0, 6));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400">
          🌟 Featured Roommates
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Meet some of our trusted and verified roommates!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {roommates.map((r) => (
          <Fade key={r.id} triggerOnce>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center">
              <img
                src={r.image}
                alt={r.name}
                className="w-28 h-28 object-cover rounded-full border-4 border-indigo-300 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{r.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{r.location}</p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                Budget: {r.budget}
              </p>
              <button className="mt-4 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 transition">
                View Profile
              </button>
            </div>
          </Fade>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 font-semibold rounded-full hover:bg-indigo-200 dark:hover:bg-gray-600 transition">
          See More Roommates →
        </button>
      </div>
    </div>
  );
};

export default FeaturedRoommates;
