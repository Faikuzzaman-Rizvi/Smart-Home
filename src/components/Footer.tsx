import React from 'react';
import { Home } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">SmartHome</span>
            </div>
            <p className="text-gray-400">
              Creating the future of smart living with innovative technology solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-500">Smart Hub</a></li>
              <li><a href="#" className="hover:text-blue-500">Security</a></li>
              <li><a href="#" className="hover:text-blue-500">Automation</a></li>
              <li><a href="#" className="hover:text-blue-500">Lighting</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-500">About Us</a></li>
              <li><a href="#" className="hover:text-blue-500">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500">Blog</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 SmartHome. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};