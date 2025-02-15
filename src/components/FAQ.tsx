import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "How does the smart home system work?",
      answer: "Our smart home system uses a central hub to connect and control all your smart devices. It leverages AI and machine learning to learn your preferences and automate your home environment for optimal comfort and efficiency."
    },
    {
      question: "Is it compatible with other smart devices?",
      answer: "Yes, our system is compatible with most major smart home brands and protocols, including Zigbee, Z-Wave, and Wi-Fi devices. We regularly update our compatibility list to include new devices."
    },
    {
      question: "What about security and privacy?",
      answer: "Security is our top priority. We use end-to-end encryption for all communications, regular security updates, and strict data privacy policies to protect your information and home security."
    },
    {
      question: "Do I need professional installation?",
      answer: "While professional installation is available, our system is designed for easy DIY setup. Most users can complete the basic installation in under an hour with our step-by-step guide."
    },
    {
      question: "What happens if my internet goes down?",
      answer: "Your smart home system will continue to function locally even without internet connectivity. Basic automations and controls will still work, though cloud-based features will be temporarily unavailable."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations for title and subtitle
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      // Animate FAQ items appearance
      faqRefs.current.forEach((faq, index) => {
        gsap.from(faq, {
          scrollTrigger: {
            trigger: faq,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAnswer = (index: number) => {
    const isOpening = openIndex !== index;
    const answer = answerRefs.current[index];
    const content = answer?.firstElementChild;

    if (!answer || !content) return;

    if (isOpening) {
      // Opening animation
      setOpenIndex(index);
      gsap.to(answer, {
        height: content.offsetHeight,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(answer, { clearProps: "height" });
        }
      });
      
      // Animate the content
      gsap.from(content, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power2.out"
      });
    } else {
      // Closing animation
      gsap.to(answer, {
        height: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setOpenIndex(null);
        }
      });
    }
  };

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
            Frequently Asked Questions
          </h2>
          <p 
            ref={subtitleRef}
            className="text-lg text-gray-600"
          >
            Find answers to common questions about our smart home solutions
          </p>
        </div>

        <div 
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => faqRefs.current[index] = el}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleAnswer(index)}
              >
                <span className="text-sm font-semibold text-gray-900">{faq.question}</span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transition-transform duration-300">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </button>
              <div
                ref={el => answerRefs.current[index] = el}
                className="overflow-hidden"
                style={{ height: openIndex === index ? 'auto' : 0 }}
              >
                <div className="px-6 pb-4 text-xs text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};