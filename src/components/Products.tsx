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
      
      // Initial position
      gsap.set(track, { x: 0 });

      // Animate cards on load with staggered rotation
      gsap.from(cards, {
        opacity: 0,
        scale: 0.8,
        rotationY: 35,
        duration: 1.2,
        stagger: {
          each: 0.08,
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
          const speed = this.getVelocity();
          Array.from(cards).forEach((card: any) => {
            gsap.to(card, {
              rotationY: speed * 0.02,
              duration: 0.5
            });
          });
        },
        onDragEnd: function() {
          Array.from(cards).forEach((card: any) => {
            gsap.to(card, {
              rotationY: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.8)"
            });
          });
        }
      })[0];

      // Enhanced card hover animations
      if (cards) {
        Array.from(cards).forEach((card: any) => {
          const image = card.querySelector('.card-image');
          const content = card.querySelector('.card-content');
          const button = card.querySelector('.add-to-cart');
          const badge = card.querySelector('.sale-badge');
          const category = card.querySelector('.category-tag');

          // Create hover timeline for each card
          const hoverTl = gsap.timeline({ paused: true });
          
          hoverTl
            .to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            })
            .to(content, {
              y: -5,
              duration: 0.3,
              ease: "power2.out"
            }, 0)
            .to(button, {
              y: 0,
              opacity: 1,
              duration: 0.2
            }, 0)
            .to(category, {
              scale: 1.1,
              duration: 0.3
            }, 0);

          if (badge) {
            hoverTl.to(badge, {
              scale: 1.1,
              rotation: 10,
              duration: 0.3
            }, 0);
          }

          // Add hover event listeners
          card.addEventListener('mouseenter', () => {
            hoverTl.play();
            gsap.to(card, {
              rotationY: 5,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            hoverTl.reverse();
            gsap.to(card, {
              rotationY: 0,
              duration: 0.4,
              ease: "power2.inOut"
            });
          });

          // Add movement animation on mousemove
          card.addEventListener('mousemove', (e: any) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            gsap.to(card, {
              rotationY: deltaX * 3,
              rotationX: -deltaY * 3,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          // Reset rotation on mouse leave
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.8)"
            });
          });
        });
      }

      // Auto-rotate animation
      const autoRotate = gsap.to(track, {
        x: -trackWidth + carouselWidth,
        duration: 30,
        repeat: -1,
        ease: "none",
        paused: true
      });

      // Pause on hover
      carouselRef.current?.addEventListener('mouseenter', () => autoRotate.pause());
      carouselRef.current?.addEventListener('mouseleave', () => autoRotate.play());

      // Start auto-rotation
      autoRotate.play();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50/50 to-blue-100/50 overflow-hidden perspective-1000"
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
          className="relative overflow-visible"
        >
          <div 
            ref={trackRef}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
            style={{ width: `${products.length * 260}px` }}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="w-[240px] flex-shrink-0 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 relative group preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {product.onSale && (
                  <div className="sale-badge absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full z-10 shadow-lg">
                    Sale!
                  </div>
                )}
                <div className="card-image relative h-40 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="category-tag absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="card-content p-4 relative z-10 bg-white">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3 truncate">{product.model}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                        ${product.price}
                      </span>
                    </div>
                    <button 
                      className="add-to-cart bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg"
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