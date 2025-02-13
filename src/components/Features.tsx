import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Lightbulb,
  Target,
  Award,
  Gem,
  Mail,
  BarChart3
} from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Features = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial loading animation sequence
      const mainTimeline = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Set initial states
      gsap.set(sectionRef.current, {
        opacity: 0,
        y: 30
      });
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 50
      });
      gsap.set(underlineRef.current, {
        opacity: 0,
        scale: 0.5
      });
      gsap.set('.wave-path', {
        strokeDasharray: 300,
        strokeDashoffset: 300
      });
      gsap.set(cardsRef.current?.children, {
        opacity: 0,
        y: 100,
        scale: 0.8
      });

      // Main loading sequence
      mainTimeline
        .to(sectionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.5")
        .to(underlineRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.8")
        .to('.wave-path', {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power3.inOut"
        }, "-=0.4")
        .to(cardsRef.current?.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "start"
          }
        }, "-=0.8");

      // Add a continuous floating animation to the wave container
      gsap.to(underlineRef.current, {
        y: "3px",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Scroll-triggered animations for when elements come into view again
      ScrollTrigger.batch(cardsRef.current?.children, {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out"
          });
        },
        onLeave: (elements) => {
          gsap.to(elements, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            stagger: 0.1,
            duration: 0.8
          });
        },
        onEnterBack: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8
          });
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, {
            opacity: 0,
            y: -50,
            scale: 0.95,
            stagger: 0.1,
            duration: 0.8
          });
        }
      });

      // Hover animations
      if (cardsRef.current?.children) {
        Array.from(cardsRef.current.children).forEach((card) => {
          const icon = card.querySelector('.icon-wrapper');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              y: -5,
              scale: 1.1,
              duration: 0.4,
              ease: "back.out(1.7)"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              duration: 0.3,
              ease: "power2.inOut"
            });
            gsap.to(icon, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.inOut"
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      color: 'text-blue-500'
    },
    {
      icon: Target,
      title: 'Best value out there',
      color: 'text-purple-500'
    },
    {
      icon: Mail,
      title: 'Great service',
      color: 'text-green-500'
    },
    {
      icon: Gem,
      title: 'We target greatness',
      color: 'text-red-500'
    },
    {
      icon: Award,
      title: 'Multiple awards',
      color: 'text-yellow-500'
    },
    {
      icon: BarChart3,
      title: 'Best product on the market',
      color: 'text-indigo-500'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-br from-blue-50/50 to-blue-100/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            We invest in the future
          </h2>
          <div 
            ref={underlineRef}
            className="relative h-6 mx-auto w-48 overflow-hidden"
          >
            <svg 
              className="absolute left-1/2 -translate-x-1/2 top-0"
              width="200" 
              height="24" 
              viewBox="0 0 200 24"
            >
              {/* Background wave */}
              <path
                className="wave-path"
                d="M0 12 Q 40 0, 80 12 T 160 12 T 240 12"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0 300"
              />
              {/* Animated wave overlay */}
              <path
                className="wave-path-animated"
                d="M-40 12 Q 0 0, 40 12 T 120 12 T 200 12"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <animate
                  attributeName="d"
                  dur="2s"
                  repeatCount="indefinite"
                  values="
                    M-40 12 Q 0 0, 40 12 T 120 12 T 200 12;
                    M-40 12 Q 0 24, 40 12 T 120 12 T 200 12;
                    M-40 12 Q 0 0, 40 12 T 120 12 T 200 12
                  "
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-240"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <div className="icon-wrapper mb-6">
                  <Icon className={`w-8 h-8 ${feature.color} stroke-[1.5]`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};