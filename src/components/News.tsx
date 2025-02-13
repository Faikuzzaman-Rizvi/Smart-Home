import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const News = () => {
  const newsRef = useRef(null);

  const news = [
    {
      title: "Smart Home Innovation",
      date: "Mar 15, 2024",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&h=300",
      description: "Latest advances in smart home technology and AI integration."
    },
    {
      title: "Security Updates",
      date: "Mar 10, 2024",
      image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=400&h=300",
      description: "New security features and improvements for smart homes."
    },
    {
      title: "Energy Efficiency",
      date: "Mar 5, 2024",
      image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=400&h=300",
      description: "How smart homes are reducing energy consumption."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(newsRef.current?.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: newsRef.current,
          start: "top center+=100",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
          <p className="text-xl text-gray-600">Stay updated with our latest developments</p>
        </div>

        <div ref={newsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};