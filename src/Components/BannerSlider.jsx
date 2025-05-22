// src/components/BannerSlider.jsx

import React from 'react';
import Slider from 'react-slick';
import { Player } from '@lottiefiles/react-lottie-player';
import { Slide } from 'react-awesome-reveal';

import banner1 from '../assets/lottie/roommate1.json';
import banner2 from '../assets/lottie/roommate2.json';
import banner3 from '../assets/lottie/roommate3.json';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
  };

  const slides = [
    {
      title: "Find Your Perfect Roommate",
      desc: "Explore verified roommate listings and connect instantly.",
      animation: banner1,
    },
    {
      title: "Safe & Trusted Community",
      desc: "Only verified users can list or connect. Safety first!",
      animation: banner2,
    },
    {
      title: "Post Your Own Listing",
      desc: "Looking for a roommate? Share your room in a minute!",
      animation: banner3,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 my-10">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-h-[550px] flex items-center justify-center bg-gradient-to-r from-indigo-50 via-sky-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-black rounded-2xl shadow-lg px-4 py-10"
          >
            {/* TEXT - TOP CENTER */}
            <Slide direction="right" triggerOnce>
              <div className="absolute top-8 w-full text-center space-y-4 px-2">
                <h2 className="text-3xl md:text-5xl font-bold text-indigo-700 dark:text-white">
                  {slide.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg max-w-xl mx-auto">
                  {slide.desc}
                </p>
              </div>
            </Slide>

            {/* BANNER - MIDDLE CENTER */}
            <Slide direction="left" triggerOnce>
              <div className="mt-20">
                <Player
                  autoplay
                  loop
                  src={slide.animation}
                  style={{ height: "320px", width: "320px" }}
                />
              </div>
            </Slide>

            {/* BUTTON - BOTTOM CENTER */}
            <Slide direction="right" triggerOnce>
              <div className="absolute bottom w-full text-center mt-5">
                <Link to="/browse">
                  <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base rounded-full transition duration-300 cursor-pointer">
                    Browse Listings
                  </button>
                </Link>
              </div>
            </Slide>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
