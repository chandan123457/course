import React from 'react';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import PlatformEcosystem from '../components/PlatformEcosystem';
import Mentors from '../components/Mentors';
import CareerJourney from '../components/CareerJourney';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <PlatformEcosystem />
      <Mentors />
      <CareerJourney />
    </>
  );
};

export default HomePage;
