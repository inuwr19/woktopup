import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosTest from "../plugins/axios";
import { Link } from "react-router-dom";

interface Game {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const FeaturedGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosTest.get("/games");
        setGames(response.data);
        console.log("Fetched games:", response.data);
      } catch (err) {
        setError("Failed to fetch games. Please try again.");
      }
    };

    fetchGames();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Games
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Choose from our selection of popular games
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link
              to={`/games/${game.id}`}
              key={game.id}
              className="relative block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform group"
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {game.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {game.description}
                </p>
              </div>
              {/* Icon or Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 mt-56">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 ">
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// import React from 'react';
// import { GameCard } from './GameCard';
// import type { Game } from '../types';

// interface FeaturedGamesProps {
//   games: Game[];
// }

// export const FeaturedGames = ({ games }: FeaturedGamesProps) => {
//   return (
//     <section className="py-16 bg-gray-50 dark:bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//             Featured Games
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Choose from our selection of popular games
//           </p>
//         </div>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {games.map((game) => (
//             <GameCard key={game.id} game={game} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
