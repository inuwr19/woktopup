import React, { useState } from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { PaymentMethodSelector } from '../components/checkout/PaymentMethodSelector';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { BackButton } from '../components/navigation/BackButton';
import { calculateServiceFee } from '../utils/cart';
import type { PaymentMethod } from '../types';

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    icon: CreditCard,
    description: 'Pay with Visa, Mastercard, or American Express',
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    icon: Wallet,
    description: 'Pay with GoPay, OVO, or DANA',
  },
];

export const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  
  // Mock data - in a real app, this would come from your cart state
  const subtotal = 70000; // Rp 70,000
  const serviceFee = calculateServiceFee(subtotal);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton label="Back to Cart" />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Method
              </h2>
              <PaymentMethodSelector
                methods={paymentMethods}
                selectedMethod={selectedMethod}
                onSelect={setSelectedMethod}
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>
              <OrderSummary
                subtotal={subtotal}
                serviceFee={serviceFee}
              />
            </div>

            <button className="w-full mt-8 bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-colors">
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};