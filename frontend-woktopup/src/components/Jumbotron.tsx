import React from 'react';
import { Sparkles, Gamepad2, Gift } from 'lucide-react';

export const Jumbotron = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1740')] opacity-10 bg-cover bg-center mix-blend-overlay" />
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <div className="flex justify-center gap-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium text-white">New User Bonus: 50% Extra Credits!</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg">
              <Gift className="w-5 h-5 mr-2 text-pink-300" />
              <span className="text-sm font-medium text-white">Daily Rewards Available</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Level Up Your Gaming <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-300">Experience</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Fast, secure, and reliable top-up service for your favorite games
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-3 bg-white dark:bg-white/90 text-indigo-600 rounded-lg font-semibold hover:bg-white/90 dark:hover:bg-white transition-all">
              <span className="flex items-center justify-center gap-2">
                Get Started
                <Gamepad2 className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-3 bg-indigo-500/50 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-indigo-500/70 transition-all border border-indigo-400/30">
              View Promotions
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {['Instant Delivery', 'Secure Payment', '24/7 Support'].map((feature) => (
              <div key={feature} className="bg-white/5 backdrop-blur-lg rounded-lg p-4">
                <p className="text-white/90">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};