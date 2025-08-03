import React from 'react';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: {
    id: number;
    gameName: string;
    amount: string;
    price: number;
  };
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <li className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {item.gameName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{item.amount}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            Rp {item.price}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </li>
  );
};


// import React from 'react';
// import { Trash2 } from 'lucide-react';
// import type { CartItem as CartItemType } from '../../types';

// interface CartItemProps {
//   item: CartItemType;
//   onRemove: (id: string) => void;
// }

// export const CartItem = ({ item, onRemove }: CartItemProps) => {
//   return (
//     <li className="p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//             {item.gameName}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300">{item.amount}</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-lg font-medium text-gray-900 dark:text-white">
//             Rp {item.price.toLocaleString()}
//           </span>
//           <button
//             onClick={() => onRemove(item.id)}
//             className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//           >
//             <Trash2 className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </li>
//   );
// };
