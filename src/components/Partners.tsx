import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Wifi, 
  Cloud, 
  Home, 
  Activity,
  MessageSquare
} from 'lucide-react';

export const Partners = () => {
  const partnersRef = useRef(null);
  const headingRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top center+=200",
        }
      });

      // Orbit rotation animation
      gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Individual partner animations
      const partners = orbitRef.current?.children;
      if (partners) {
        Array.from(partners).forEach((partner, index) => {
          // Counter-rotation to keep icons upright
          gsap.to(partner, {
            rotate: -360,
            duration: 20,
            repeat: -1,
            ease: "none"
          });

          // Initial fade in with stagger
          gsap.from(partner, {
            opacity: 0,
            scale: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)"
          });

          // Hover animations
          partner.addEventListener('mouseenter', () => {
            gsap.to(partner, {
              scale: 1.2,
              duration: 0.4,
              ease: "back.out(1.7)"
            });
            // Pause the rotations on hover
            gsap.to([orbitRef.current, partner], {
              timeScale: 0,
              duration: 0.4
            });
          });

          partner.addEventListener('mouseleave', () => {
            gsap.to(partner, {
              scale: 1,
              duration: 0.3,
              ease: "power2.inOut"
            });
            // Resume the rotations
            gsap.to([orbitRef.current, partner], {
              timeScale: 1,
              duration: 0.4
            });
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const partners = [
    { name: 'Netgear', icon: Wifi, color: 'text-blue-600' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-500' },
    { name: 'Nest', icon: Home, color: 'text-green-500' },
    { name: 'OpenPeak', icon: Activity, color: 'text-purple-500' },
    { name: 'Kakao', icon: MessageSquare, color: 'text-yellow-500' }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-blue-50/50 to-blue-100/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Information */}
          <div className="lg:pr-12" ref={headingRef}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              We work with great companies
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Efficiently unleash cross-media information without cross-media value. 
              Quickly maximize timely deliverables for real-time schemas.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
              Read More
            </button>
          </div>

          {/* Right side - Company Logos */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-blue-200/50 rounded-full"></div>
            <div 
              ref={orbitRef}
              className="w-full h-full relative"
            >
              {partners.map((partner, index) => {
                const Icon = partner.icon;
                const angle = (index * 360) / partners.length;
                return (
                  <div 
                    key={partner.name} 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-180px)`
                    }}
                  >
                    <div className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg p-4 backdrop-blur-sm">
                      <Icon className={`w-8 h-8 ${partner.color}`} />
                      <span className="text-sm font-semibold text-gray-800 mt-2">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* Center circle */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/50 rounded-full backdrop-blur-sm border border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
