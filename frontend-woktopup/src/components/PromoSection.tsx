import React from 'react';
import { Tag, Zap, Shield, Gift, Clock, CreditCard } from 'lucide-react';

export const PromoSection = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="text-indigo-600 dark:text-indigo-400">WokTopup</span>?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the best top-up service with exclusive benefits and unmatched convenience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-indigo-500/10 transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                <Tag className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Best Prices
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Get the most competitive prices with regular discounts and promotions
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-indigo-500/10 transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-lg">
                <Gift className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Loyalty Rewards
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Earn points with every purchase and get exclusive rewards
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-indigo-500/10 transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Instant Processing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Get your top-up delivered instantly after payment confirmation
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-indigo-500/10 transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              100% Secure
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Your transactions are protected with bank-level security
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-indigo-500/10 transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                <CreditCard className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Multiple Payment Options
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Pay with your preferred payment method
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-indigo-500/10 transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              24/7 Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Our support team is always ready to help you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};