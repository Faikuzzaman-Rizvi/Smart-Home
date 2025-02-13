import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our smart home solution
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-blue-600" />
                ) : (
                  <Plus className="h-5 w-5 text-blue-600" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};