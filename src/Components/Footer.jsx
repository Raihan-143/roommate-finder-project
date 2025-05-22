import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-indigo-50 dark:bg-gray-900 text-gray-700 dark:text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-white">RoomMateFinder</h2>
          <p className="mt-2 text-sm">
            Making roommate finding easier, safer, and friendlier than ever before.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/browse" className="hover:underline">Browse Roommates</a></li>
            <li><a href="/add-listing" className="hover:underline">Add Listing</a></li>
            <li><a href="/blogs" className="hover:underline">Blog</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a
              href="https://www.facebook.com/share/1DsyU8WuRM/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 dark:text-white hover:text-indigo-500"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://github.com/Raihan-143"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 dark:text-white hover:text-indigo-500"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-raihan-hasan-rana-61962328a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 dark:text-white hover:text-indigo-500"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} RoomMateFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
