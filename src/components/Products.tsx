import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Tablet, Laptop, Watch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Products = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      title: "Smart Hub",
      price: "$199",
      image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=600&h=400",
      icon: Smartphone,
      description: "Central control for all your smart devices"
    },
    {
      title: "Security Camera",
      price: "$149",
      image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=600&h=400",
      icon: Tablet,
      description: "HD security with night vision"
    },
    {
      title: "Smart Thermostat",
      price: "$129",
      image: "https://images.unsplash.com/photo-1567925086590-62ff6f7cbb2c?auto=format&fit=crop&w=600&h=400",
      icon: Laptop,
      description: "Intelligent climate control"
    },
    {
      title: "Smart Watch",
      price: "$299",
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&h=400",
      icon: Watch,
      description: "Control your home from your wrist"
    }
  ];

  useEffect(() => {
    // Custom cursor animation
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const container = containerRef.current;

    if (!cursor || !cursorDot || !container) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      gsap.to(cursor, {
        x,
        y,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        x,
        y,
        duration: 0.1,
        ease: "none"
      });
    };

    container.addEventListener('mousemove', moveCursor);

    // Product animations
    const ctx = gsap.context(() => {
      const products = productsRef.current?.children;
      if (!products) return;

      // Initial animation for products
      gsap.from(products, {
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Parallax effect for images
      Array.from(products).forEach((product) => {
        const image = product.querySelector('img');
        if (!image) return;

        gsap.to(image, {
          scrollTrigger: {
            trigger: product,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          },
          y: 30,
          ease: "none"
        });
      });

      // Hover animations
      Array.from(products).forEach((product) => {
        product.addEventListener('mouseenter', () => {
          gsap.to(cursor, {
            scale: 2,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            duration: 0.3
          });
          gsap.to(product, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        product.addEventListener('mouseleave', () => {
          gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            duration: 0.3
          });
          gsap.to(product, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    });

    return () => {
      container.removeEventListener('mousemove', moveCursor);
      ctx.revert();
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Smart Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of intelligent devices designed to make your home smarter
          </p>
        </div>

        {/* Custom cursor */}
        <div
          ref={cursorRef}
          className="hidden md:block pointer-events-none fixed w-20 h-20 rounded-full bg-blue-500 bg-opacity-5 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
        />
        <div
          ref={cursorDotRef}
          className="hidden md:block pointer-events-none fixed w-2 h-2 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* Products grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{product.title}</h3>
                  <product.icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};