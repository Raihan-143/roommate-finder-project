import React from 'react';
import BannerSlider from '../Components/BannerSlider';
import FeaturedRoommates from '../Components/FeaturedRoommates';
import HowItWorks from '../Components/HowItWorks';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonials from '../Components/Testimonials';

const Home = () => {
    return (
        <div>
        <BannerSlider></BannerSlider>
        <FeaturedRoommates></FeaturedRoommates>
        <HowItWorks></HowItWorks>
        <WhyChooseUs></WhyChooseUs>
        <Testimonials></Testimonials>
        </div>
    );
};

export default Home;