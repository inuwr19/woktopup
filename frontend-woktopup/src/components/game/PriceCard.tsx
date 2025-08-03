// import React from 'react';
import type { TopUpOption } from '../../types';

interface PriceCardProps {
  option: TopUpOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const PriceCard = ({ option, isSelected, onSelect }: PriceCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
      }`}
    >
      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {option.name}
      </div>
      <div className="text-sm text-indigo-600 dark:text-indigo-400">
        Rp {option.price.toLocaleString()}
      </div>
    </button>
  );
};
