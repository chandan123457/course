import React from 'react';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import PlatformEcosystem from '../components/PlatformEcosystem';
import IndustrialCertification from '../components/IndustrialCertification';
import TrainingPrograms from '../components/TrainingPrograms';
import Mentors from '../components/Mentors';
import MockInterviews from '../components/MockInterviews';
import PlacementPortal from '../components/PlacementPortal';
import CareerJourney from '../components/CareerJourney';
import ComingSoon from '../components/ComingSoon';
import FeaturedCourses from '../components/FeaturedCourses';
import FeaturedWebinars from '../components/FeaturedWebinars';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <PlatformEcosystem />
      <IndustrialCertification />
      <TrainingPrograms />
      <FeaturedCourses />
      <FeaturedWebinars />
      <Mentors />
      <MockInterviews />
      <PlacementPortal />
      <CareerJourney />
      <ComingSoon />
    </>
  );
};

export default HomePage;
