import React, { useState } from 'react';
import { Menu, X, Home, Settings, Users, Phone } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-transparent backdrop-blur-sm z-50 mt-4 mx-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/30 rounded-2xl shadow-lg">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SmartHome</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#devices" className="text-gray-700 hover:text-blue-600 transition-colors">Devices</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 mx-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/30 backdrop-blur-sm rounded-2xl shadow-lg">
            <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Features</a>
            <a href="#devices" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Devices</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Testimonials</a>
            <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
