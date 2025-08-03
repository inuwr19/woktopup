import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  return (
    <div className="text-center py-12">
      <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Looks like you haven't added any items to your cart yet
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
      >
        Continue Shopping
      </Link>
    </div>
  );
};