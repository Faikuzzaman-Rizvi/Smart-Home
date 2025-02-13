import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, Draggable);

export const Products = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const products = [
    {
      id: 1,
      name: 'Smart Camera Pro',
      model: 'ProVision X1',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.pexels.com/photos/3513239/pexels-photo-3513239.jpeg',
      onSale: true,
      category: 'Security'
    },
    {
      id: 2,
      name: 'AI Thermostat',
      model: 'ClimateIQ Pro',
      price: 159.99,
      image: 'https://images.pexels.com/photos/3689941/pexels-photo-3689941.jpeg',
      onSale: false,
      category: 'Climate'
    },
    {
      id: 3,
      name: 'Smart Lock',
      model: 'SecureHome+',
      price: 179.99,
      originalPrice: 229.99,
      image: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg',
      onSale: true,
      category: 'Security'
    },
    {
      id: 4,
      name: 'LED Bundle',
      model: 'AuroraGlow',
      price: 89.99,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      onSale: false,
      category: 'Lighting'
    },
    {
      id: 5,
      name: 'Smart Speaker',
      model: 'SoundHub',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg',
      onSale: true,
      category: 'Audio'
    },
    {
      id: 6,
      name: 'Video Doorbell',
      model: 'ViewGuard',
      price: 149.99,
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg',
      onSale: false,
      category: 'Security'
    },
    {
      id: 7,
      name: 'Robot Vacuum',
      model: 'CleanMaster',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.pexels.com/photos/4087992/pexels-photo-4087992.jpeg',
      onSale: true,
      category: 'Appliances'
    },
    {
      id: 8,
      name: 'Smart Plug',
      model: 'PowerControl',
      price: 29.99,
      image: 'https://images.pexels.com/photos/4297438/pexels-photo-4297438.jpeg',
      onSale: false,
      category: 'Power'
    },
    {
      id: 9,
      name: 'Security Hub',
      model: 'SafeCore',
      price: 249.99,
      originalPrice: 299.99,
      image: 'https://images.pexels.com/photos/3593865/pexels-photo-3593865.jpeg',
      onSale: true,
      category: 'Security'
    },
    {
      id: 10,
      name: 'Smart Display',
      model: 'ViewHub',
      price: 179.99,
      image: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg',
      onSale: false,
      category: 'Display'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      headerTl
        .from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        })
        .from(underlineRef.current, {
          width: 0,
          duration: 0.8,
          ease: "power3.inOut"
        }, "-=0.5");

      // Initialize carousel
      const track = trackRef.current;
      const cards = track?.children;
      const carouselWidth = carouselRef.current?.offsetWidth || 0;
      const trackWidth = track?.offsetWidth || 0;
      const cardWidth = trackWidth / products.length;
      
      // Initial position
      gsap.set(track, { x: 0 });

      // Animate cards on load
      gsap.from(cards, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: {
          each: 0.1,
          from: "center"
        },
        ease: "power3.out"
      });

      // Make track draggable
      const draggable = Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: {
          minX: -trackWidth + carouselWidth,
          maxX: 0
        },
        edgeResistance: 0.65,
        onDrag: function() {
          // Update rotation based on drag speed
          const speed = this.getVelocity();
          Array.from(cards).forEach((card: any) => {
            gsap.to(card, {
              rotation: speed * 0.005,
              duration: 0.5
            });
          });
        },
        onDragEnd: function() {
          // Reset rotation smoothly
          Array.from(cards).forEach((card: any) => {
            gsap.to(card, {
              rotation: 0,
              duration: 0.5
            });
          });
        }
      })[0];

      // Auto-rotate animation
      const autoRotate = gsap.to(track, {
        x: -trackWidth + carouselWidth,
        duration: 30,
        repeat: -1,
        ease: "none",
        paused: true
      });

      // Start auto-rotation
      autoRotate.play();

      // Pause on hover
      carouselRef.current?.addEventListener('mouseenter', () => autoRotate.pause());
      carouselRef.current?.addEventListener('mouseleave', () => autoRotate.play());

      // Add hover effects to cards
      if (cards) {
        Array.from(cards).forEach((card: any) => {
          const button = card.querySelector('.add-to-cart');
          const badge = card.querySelector('.sale-badge');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(button, {
              y: 0,
              opacity: 1,
              duration: 0.3
            });
            if (badge) {
              gsap.to(badge, {
                scale: 1.1,
                rotation: 10,
                duration: 0.3
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.inOut"
            });
            gsap.to(button, {
              y: 10,
              opacity: 0,
              duration: 0.3
            });
            if (badge) {
              gsap.to(badge, {
                scale: 1,
                rotation: 0,
                duration: 0.3
              });
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50/50 to-blue-100/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Smart Home Collection
          </h2>
          <div 
            ref={underlineRef}
            className="w-32 h-1 bg-blue-500 mx-auto rounded-full"
          />
        </div>

        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
        >
          <div 
            ref={trackRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            style={{ width: `${products.length * 300}px` }}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="w-[280px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 relative"
              >
                {product.onSale && (
                  <div className="sale-badge absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-lg">
                    Sale!
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{product.model}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-blue-600">
                        ${product.price}
                      </span>
                    </div>
                    <button 
                      className="add-to-cart bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full flex items-center gap-1 opacity-0 translate-y-10 transition-all duration-300 shadow-lg"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};