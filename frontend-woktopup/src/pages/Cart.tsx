import React, { useEffect, useState } from 'react';
import { CartItem } from '../components/cart/CartItem';
import { fetchOrders, removeOrder } from '../api/order';


export const Cart: React.FC = () => {
  const [orders, setOrders] = useState<
    { id: number; gameName: string; amount: string; price: number }[]
  >([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    };

    loadOrders();
  }, []);

  const handleRemove = async (orderId: number) => {
    try {
      await removeOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Failed to remove order:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {orders.map((order) => (
          <CartItem key={order.id} item={order} onRemove={handleRemove} />
        ))}
      </ul>
    </div>
  );
};



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BackButton } from '../components/navigation/BackButton';
// import { CartEmpty } from '../components/cart/CartEmpty';
// import { CartItem } from '../components/cart/CartItem';
// import type { CartItem as CartItemType } from '../types';

// const mockCartItems: CartItemType[] = [
//   {
//     id: '1',
//     gameId: '1',
//     gameName: 'Mobile Legends',
//     amount: '100 Diamonds',
//     price: 20000,
//   },
//   {
//     id: '2',
//     gameId: '2',
//     gameName: 'Genshin Impact',
//     amount: '300 Genesis Crystals',
//     price: 50000,
//   },
// ];

// export const Cart = () => {
//   const [cartItems, setCartItems] = React.useState<CartItemType[]>(mockCartItems);

//   const handleRemoveItem = (id: string) => {
//     setCartItems(items => items.filter(item => item.id !== id));
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.price, 0);

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <BackButton label="Continue Shopping" />
//           <CartEmpty />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <BackButton label="Continue Shopping" />
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
//           </div>
//           <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//             {cartItems.map(item => (
//               <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
//             ))}
//           </ul>
//           <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
//             <div className="flex items-center justify-between mb-6">
//               <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
//               <span className="text-2xl font-bold text-gray-900 dark:text-white">
//                 Rp {total.toLocaleString()}
//               </span>
//             </div>
//             <Link
//               to="/checkout"
//               className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
//             >
//               Proceed to Checkout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };