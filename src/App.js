import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import PlatformEcosystem from './components/PlatformEcosystem';
import IndustrialCertification from './components/IndustrialCertification';
import TrainingPrograms from './components/TrainingPrograms';
import Mentors from './components/Mentors';
import MockInterviews from './components/MockInterviews';
import PlacementPortal from './components/PlacementPortal';
import CareerJourney from './components/CareerJourney';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ProblemSection />
        <PlatformEcosystem />
        <IndustrialCertification />
        <TrainingPrograms />
        <Mentors />
        <MockInterviews />
        <PlacementPortal />
        <CareerJourney />
        <ComingSoon />
      </main>
      <Footer />
    </div>
  );
}

export default App;
