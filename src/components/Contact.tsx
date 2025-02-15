import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '12px'
};

const center = {
  lat: 23.8103,  // Replace with your actual latitude
  lng: 90.4125   // Replace with your actual longitude
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#4b5563' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#f3f4f6' }]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#e5e7eb' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f3f4f6' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#e5e7eb' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#bfdbfe' }]
    }
  ]
};

export const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const infoRef = useRef(null);
  const [mapError, setMapError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
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

      // Form and Map animations
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: formRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      });

      contentTl
        .from(formRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
        .from(mapRef.current, {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(infoRef.current?.children, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.6");

      // Input focus animations
      const inputs = formRef.current?.querySelectorAll('input, textarea');
      inputs?.forEach((input: any) => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-[#EEF5FF] via-white to-[#F5F9FF] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-3"
          >
            Get in Touch
          </h2>
          <p 
            ref={subtitleRef}
            className="text-lg text-gray-600"
          >
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <div 
            ref={formRef}
            className="bg-white rounded-xl shadow-sm p-6 lg:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Map and Contact Info */}
          <div className="space-y-6">
            <div 
              ref={mapRef}
              className="bg-white rounded-xl shadow-sm overflow-hidden h-[300px]"
            >
              {!mapError ? (
                <LoadScript 
                  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
                  onError={handleMapError}
                >
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                    options={mapOptions}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              ) : (
                <div className="h-full bg-blue-50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-gray-900">Our Location</h3>
                    <p className="text-sm text-gray-600">123 Smart Street, Tech City</p>
                    <a 
                      href="https://maps.google.com/?q=123+Smart+Street+Tech+City"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm mt-2"
                    >
                      View on Google Maps
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div 
              ref={infoRef}
              className="bg-white rounded-xl shadow-sm p-6 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Our Location</h3>
                  <p className="text-sm text-gray-600">123 Smart Street, Tech City, 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Phone Number</h3>
                  <p className="text-sm text-gray-600">+1 (234) 567-8900</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email Address</h3>
                  <p className="text-sm text-gray-600">contact@smartcompany.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Working Hours</h3>
                  <p className="text-sm text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};