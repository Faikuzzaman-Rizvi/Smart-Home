import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Cloud, Shield, Zap } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef(null);
  const circleRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: "https://images.pexels.com/photos/30641386/pexels-photo-30641386/free-photo-of-close-up-of-smart-light-switch-and-door-handle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Smart home background"
    },
    {
      src: "https://images.pexels.com/photos/22307516/pexels-photo-22307516/free-photo-of-smart-home-devices-equipment.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Smart home devices"
    },
    {
      src: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Smart home interior"
    },
    {
      src: "https://images.pexels.com/photos/25473948/pexels-photo-25473948/free-photo-of-smart-home-sleeping-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Smart home bedroom"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out"
      });

      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    });

    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`absolute inset-0 w-full h-full object-cover opacity-3 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 mt-40">
        <div ref={heroRef} className="relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              We create modern
              <br />
              <span className="text-blue-600">user experience</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We enable AI-powered IoT devices to create the perfect smart home
              ecosystem for your needs
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div
            ref={circleRef}
            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative w-96 h-96">
              <Cloud className="absolute top-0 left-1/2 transform -translate-x-1/2 h-12 w-12 text-blue-600" />
              <Shield className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-12 w-12 text-blue-600" />
              <Zap className="absolute left-0 top-1/2 transform -translate-y-1/2 h-12 w-12 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
