import React from 'react';
import { Mail } from 'lucide-react';

export const Newsletter = () => {
  return (
    <div className="bg-indigo-600 dark:bg-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
            <p className="text-indigo-100">Subscribe to get the latest promotions and gaming news</p>
          </div>
          <div className="flex-1 w-full">
            <form className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-indigo-500 dark:border-indigo-700 bg-white/10 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};