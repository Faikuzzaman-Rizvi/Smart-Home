import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const News = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const newsRef = useRef(null);

  const news = [
    {
      title: "Revolutionary AI Integration in Smart Homes",
      author: "Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&h=300",
      description: "Discover how artificial intelligence is revolutionizing home automation. Our latest update brings predictive learning and enhanced comfort to your living space.",
      tags: ["AI", "Innovation", "Smart Home"]
    },
    {
      title: "Enhanced Security Features Released",
      author: "Michael Chen",
      date: "Mar 10, 2024",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=400&h=300",
      description: "We're introducing advanced biometric authentication and AI-powered threat detection to make your smart home more secure than ever.",
      tags: ["Security", "Updates", "Protection"]
    },
    {
      title: "Smart Energy Management Solutions",
      author: "Emma Davis",
      date: "Mar 5, 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=400&h=300",
      description: "Learn how our new energy optimization algorithms can reduce your home's energy consumption by up to 30% while maintaining perfect comfort.",
      tags: ["Energy", "Efficiency", "Sustainability"]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations with enhanced effects
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      headerTl
        .from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
        .from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.7");

      // News cards animation with 3D effects
      const cards = newsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card: any, index) => {
          const image = card.querySelector('.news-image');
          const content = card.querySelector('.news-content');
          const tags = card.querySelectorAll('.news-tag');
          
          // Initial animation
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none reverse"
            }
          });

          cardTl
            .from(card, {
              y: 30,
              opacity: 0,
              rotationY: 15,
              duration: 0.8,
              ease: "power3.out"
            })
            .from(image, {
              scale: 1.2,
              opacity: 0,
              duration: 1,
              ease: "power3.out"
            }, "-=0.6")
            .from(content, {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out"
            }, "-=0.8")
            .from(tags, {
              x: -10,
              opacity: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power3.out"
            }, "-=0.4");

          // Hover animations
          const hoverTl = gsap.timeline({ paused: true });
          
          hoverTl
            .to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            })
            .to(image, {
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out"
            }, 0);

          // Mouse movement effect
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
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseenter', () => {
            hoverTl.play();
          });

          card.addEventListener('mouseleave', () => {
            hoverTl.reverse();
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.8)"
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-[#EEF5FF] via-white to-[#F5F9FF] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-5" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-3"
          >
            Latest News & Updates
          </h2>
          <p 
            ref={subtitleRef}
            className="text-lg text-gray-600"
          >
            Stay informed about the latest innovations in smart home technology
          </p>
        </div>

        <div 
          ref={newsRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {news.map((item, index) => (
            <article 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative overflow-hidden h-36">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="news-image w-full h-full object-cover transform transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="news-content p-4">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </div>
                </div>
                
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{item.author}</span>
                  </div>
                  <button className="text-blue-600 text-xs font-semibold inline-flex items-center gap-0.5 hover:gap-1.5 transition-all duration-300 group-hover:text-blue-700">
                    Read More 
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                  {item.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="news-tag px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};