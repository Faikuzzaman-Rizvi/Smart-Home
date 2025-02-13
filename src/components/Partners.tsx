import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Partners = () => {
  const partnersRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "back.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top center+=200",
        }
      });

      // Partners staggered animation with hover effect
      const partners = partnersRef.current?.children;
      gsap.from(partners, {
        opacity: 0,
        y: 50,
        rotation: -15,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: partnersRef.current,
          start: "top center+=100",
        }
      });

      // Add hover animations
      if (partners) {
        Array.from(partners).forEach(partner => {
          partner.addEventListener('mouseenter', () => {
            gsap.to(partner, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          partner.addEventListener('mouseleave', () => {
            gsap.to(partner, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.in"
            });
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Trusted by Industry Leaders
          </h2>
        </div>
        <div 
          ref={partnersRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center"
        >
          {['Nest', 'Ring', 'Philips Hue', 'Samsung'].map((partner) => (
            <div 
              key={partner} 
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-8 py-6 bg-gray-800 rounded-lg border border-gray-700 backdrop-blur-sm">
                <span className="text-2xl font-bold text-white">
                  {partner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
