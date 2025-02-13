import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Partners } from './components/Partners';
import { Features } from './components/Features';
import { Products } from './components/Products';
import { CTA } from './components/CTA';
import { FAQ } from './components/FAQ';
import { News } from './components/News';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <Navigation />
      <Hero />
      <Partners />
      <Features />
      <Products />
      <CTA />
      <FAQ />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;