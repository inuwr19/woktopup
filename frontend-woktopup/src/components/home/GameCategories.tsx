import React from 'react';
import { Smartphone, Sword, Crosshair, Gamepad2 } from 'lucide-react';

const categories = [
  { id: 'mobile', name: 'Mobile Games', icon: Smartphone },
  { id: 'rpg', name: 'RPG', icon: Sword },
  { id: 'fps', name: 'FPS', icon: Crosshair },
  { id: 'console', name: 'Console', icon: Gamepad2 },
];

export const GameCategories = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 group transition-all"
            >
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-indigo-500 dark:group-hover:bg-indigo-500 transition-colors">
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};