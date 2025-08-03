import axios from 'axios';
import axiosTest from '../plugins/axios';

// Fetch all orders for the authenticated user
export const fetchOrders = async () => {
  try {
    const response = await axiosTest.get('/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('user_id')}` }, // Gunakan token jika diperlukan
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Add a new order (add product to cart)
export const addOrder = async (order: {
  user_id: number;
  product_id: number;
  game_account_id: string;
  quantity: number;
  total_price: number;
}) => {
  try {
    const response = await axiosTest.post('/orders', order, {
      headers: { Authorization: `Bearer ${localStorage.getItem('user_id')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

// Remove an order
export const removeOrder = async (orderId: number) => {
  try {
    await axiosTest.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('user_id')}` },
    });
  } catch (error) {
    console.error('Error removing order:', error);
    throw error;
  }
};
