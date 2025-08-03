// import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link to={`/game/${game.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <div className="flex items-center justify-between text-white">
                <span className="font-medium">View Details</span>
                <ExternalLink className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {game.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {game.description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-indigo-600 dark:text-indigo-400">
              Starting from
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              Rp {game.topupOptions[0].price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};