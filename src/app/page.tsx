'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyQuickSend from '@/components/WhyQuickSend';
import Products from '@/components/Products';
import Stats from '@/components/Stats';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimationWrapper from '@/components/AnimationWrapper';

export default function Home() {
  return (
    <>
      <AnimationWrapper />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <WhyQuickSend />
          <Products />
          <Stats />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}