import React from 'react';
import { HeroIntro as Hero } from '../../../hero/components/HeroIntro';
import { ShowcaseSection as PortfolioShowcase } from '../../../showcase/components/ShowcaseSection';
import { TechStackSection as About } from '../../../tech-stack/components/TechStackSection';
import { ContactSection as Contact } from '../../../contact/components/ContactSection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <PortfolioShowcase />
      <About />
      <Contact />
    </>
  );
};
