import React from 'react';
import AboutBanner from '../components/AboutBanner';
import WhyChooseUs from '../components/WhyChooseUs';
import ExploreWorldCard from '../components/ExploreWorldCard';
import CustomerTestimonial from '../components/CustomerTestimonial';


const About = () => {
  return (
    <div>
      <AboutBanner />
      <WhyChooseUs />
      <ExploreWorldCard />
      <CustomerTestimonial />
    </div>
  );
};

export default About;