import React from 'react';
import type { PaymentMethod } from '../../types';

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (id: string) => void;
}

export const PaymentMethodSelector = ({ 
  methods, 
  selectedMethod, 
  onSelect 
}: PaymentMethodSelectorProps) => {
  return (
    <div className="grid gap-4">
      {methods.map(({ id, name, icon: Icon, description }) => (
        <label
          key={id}
          className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            selectedMethod === id
              ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={id}
            checked={selectedMethod === id}
            onChange={(e) => onSelect(e.target.value)}
            className="sr-only"
          />
          <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>
          </div>
        </label>
      ))}
    </div>
  );
};