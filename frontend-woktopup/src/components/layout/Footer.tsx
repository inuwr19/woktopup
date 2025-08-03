import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Facebook, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
  Company: ['About Us', 'Careers', 'Press'],
  Support: ['Help Center', 'Safety', 'Terms of Service'],
  Legal: ['Privacy Policy', 'Cookie Policy', 'Terms of Use'],
};

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">WokTopup</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your trusted gaming top-up destination. Fast, secure, and reliable service 24/7.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} WokTopup. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};