import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wifi, Battery, Shield, Zap, Clock, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Features = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const features = featuresRef.current?.children;
      
      gsap.from(features, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Wifi, title: "Remote Access", description: "Control your home from anywhere in the world" },
    { icon: Battery, title: "Energy Efficient", description: "Save on energy costs with smart optimization" },
    { icon: Shield, title: "Advanced Security", description: "Keep your home safe with 24/7 monitoring" },
    { icon: Zap, title: "Quick Response", description: "Instant notifications and rapid system response" },
    { icon: Clock, title: "Scheduling", description: "Automate your home with custom schedules" },
    { icon: Cloud, title: "Cloud Integration", description: "Seamless cloud backup and synchronization" }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Living
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the amazing capabilities that make our smart home solution stand out
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((Feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-colors"
            >
              <Feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{Feature.title}</h3>
              <p className="text-gray-600">{Feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};