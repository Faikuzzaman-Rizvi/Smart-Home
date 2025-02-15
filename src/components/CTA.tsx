import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CTA = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });

      // Animate text elements
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      })
      .from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      }, "-=0.7")
      .from(buttonsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.7");

      // Animate smart home icons
      const icons = gsap.utils.toArray('.smart-icon');
      
      // Initial setup
      gsap.set(icons, { opacity: 0, scale: 0.5 });
      gsap.set(circleRef.current, { opacity: 0, scale: 0.8 });

      // Animate circle
      tl.to(circleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=1");

      // Animate icons with stagger
      tl.to(icons, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: {
          each: 0.1,
          from: "random"
        },
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Create floating animation for icons
      icons.forEach((icon: any) => {
        gsap.to(icon, {
          y: "random(-8, 8)",
          x: "random(-8, 8)",
          rotation: "random(-15, 15)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Rotate the circle slowly
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Information */}
          <div className="text-left">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-6"
            >
              We create modern user experience
            </h2>
            <p 
              ref={textRef}
              className="text-xl text-gray-600 mb-8"
            >
              Transform your living space into an intelligent ecosystem. Our smart home solutions seamlessly integrate comfort, security, and efficiency for a truly modern lifestyle.
            </p>
            <div 
              ref={buttonsRef}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                See More
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Column - Smart Home Image */}
          <div 
            ref={imageContainerRef}
            className="relative flex items-center justify-center"
          >
            {/* Background Circle */}
            <div 
              ref={circleRef}
              className="absolute w-[400px] h-[400px] border-2 border-dashed border-blue-200 rounded-full"
            />
            
            {/* Center Cloud Icon */}
            <div className="smart-icon absolute w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center z-10 shadow-lg">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>

            {/* Surrounding Smart Home Icons */}
            <div className="smart-icon absolute top-10 left-20 w-12 h-12 bg-green-400 text-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="smart-icon absolute top-20 right-20 w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="smart-icon absolute bottom-20 left-20 w-12 h-12 bg-indigo-400 text-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="smart-icon absolute bottom-10 right-20 w-12 h-12 bg-purple-400 text-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};