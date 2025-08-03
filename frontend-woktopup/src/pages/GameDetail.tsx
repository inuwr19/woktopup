import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, CreditCard, Clock } from 'lucide-react';
import axios from 'axios';
import { PriceCard } from '../components/game/PriceCard';
import { PaymentMethod } from '../components/game/PaymentMethod';
import { BackButton } from '../components/navigation/BackButton';

interface TopUpOption {
  id: number;
  name: string;
  price: number;
}

interface Game {
  id: number;
  name: string;
  description: string;
  image: string;
  topupOptions: TopUpOption[];
}

export const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/games/${id}`);
        const data = response.data;
        // Transform backend product data to match the expected structure
        setGame({
          id: data.id,
          name: data.title,
          description: data.description,
          image: data.image,
          topupOptions: data.products.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          })),
        });
      } catch (err) {
        setError('Failed to load game details. Please try again later.');
      }
    };

    fetchGameDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!game) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton label="Back to Games" />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
              <p className="text-white/80">{game.description}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Secure</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">100% Safe Transaction</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Payment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Multiple Methods</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Instant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Fast Processing</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select Amount
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {game.topupOptions.map((option) => (
                  <PriceCard
                    key={option.id}
                    option={option}
                    isSelected={selectedOption?.id === option.id}
                    onSelect={() => setSelectedOption(option)}
                  />
                ))}
              </div>
            </div>

            {selectedOption && (
              <PaymentMethod 
                selectedOption={selectedOption}
                gameName={game.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Shield, CreditCard, Clock } from 'lucide-react';
// import { TopUpOption } from '../types';
// import { games } from '../data/games';
// import { PriceCard } from '../components/game/PriceCard';
// import { PaymentMethod } from '../components/game/PaymentMethod';
// import { BackButton } from '../components/navigation/BackButton';

// export const GameDetail = () => {
//   const { id } = useParams();
//   const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(null);
  
//   const game = games.find(g => g.id === id);
  
//   if (!game) {
//     return <div>Game not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <BackButton label="Back to Games" />
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//           <div className="relative h-64 sm:h-80">
//             <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             <div className="absolute bottom-0 left-0 p-6">
//               <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
//               <p className="text-white/80">{game.description}</p>
//             </div>
//           </div>
          
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//                 <div>
//                   <h3 className="font-medium text-gray-900 dark:text-white">Secure</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">100% Safe Transaction</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//                 <div>
//                   <h3 className="font-medium text-gray-900 dark:text-white">Payment</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">Multiple Methods</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//                 <div>
//                   <h3 className="font-medium text-gray-900 dark:text-white">Instant</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">Fast Processing</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//                 Select Amount
//               </h2>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {game.topupOptions.map((option) => (
//                   <PriceCard
//                     key={option.id}
//                     option={option}
//                     isSelected={selectedOption?.id === option.id}
//                     onSelect={() => setSelectedOption(option)}
//                   />
//                 ))}
//               </div>
//             </div>

//             {selectedOption && (
//               <PaymentMethod 
//                 selectedOption={selectedOption}
//                 gameName={game.name}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };