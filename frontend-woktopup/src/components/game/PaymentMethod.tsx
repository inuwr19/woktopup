import React from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import type { TopUpOption } from '../../types';

interface PaymentMethodProps {
  selectedOption: TopUpOption;
  gameName: string;
}

export const PaymentMethod = ({ selectedOption, gameName }: PaymentMethodProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Payment Method
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700">
          <CreditCard className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-white">Credit Card</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Visa, Mastercard</div>
          </div>
        </button>
        <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700">
          <Wallet className="w-6 h-6" />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-white">E-Wallet</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">GoPay, OVO, DANA</div>
          </div>
        </button>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex justify-between mb-4">
          <span className="text-gray-600 dark:text-gray-300">Product</span>
          <span className="text-gray-900 dark:text-white">{gameName} - {selectedOption.amount}</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="text-gray-600 dark:text-gray-300">Price</span>
          <span className="text-gray-900 dark:text-white">Rp {selectedOption.price.toLocaleString()}</span>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-colors">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};