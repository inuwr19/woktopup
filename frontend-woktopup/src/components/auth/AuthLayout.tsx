import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import { BackButton } from '../navigation/BackButton';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative">
          <div className="absolute left-0 top-0 -mt-12">
            <BackButton />
          </div>
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <Gamepad2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              WokTopup
            </span>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};