import type { CartItem } from '../types';

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

export const calculateServiceFee = (total: number): number => {
  return Math.ceil(total * 0.015); // 1.5% service fee
};