import React from 'react';
import Banner from '../components/Banner';
import ShortTourCard from '../components/ShortTourCard';
import TopDestinationSlider from '../components/TopDestinationSlider';
import StepsSection from '../components/StepsSection';
import ExperienceSection from '../components/ExperienceSection';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <StepsSection />
      <TopDestinationSlider />
      <ShortTourCard />
      <ExperienceSection />
    </div>
  );
};

export default Home;