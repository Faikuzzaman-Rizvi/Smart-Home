import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-blue-600">
      <div ref={ctaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Home?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied homeowners who have already made the smart choice.
          Get started today and experience the future of living.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center hover:bg-blue-50 transition-colors">
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};