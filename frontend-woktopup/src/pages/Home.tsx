// import React from 'react';
import { Jumbotron } from '../components/Jumbotron';
import { PromoSection } from '../components/PromoSection';
import { FeaturedGames } from '../components/FeaturedGames';
import { GameCategories } from '../components/home/GameCategories';
import { LatestTransactions } from '../components/home/LatestTransactions';
import { Newsletter } from '../components/home/Newsletter';
// import { games } from '../data/games';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Jumbotron />
      <GameCategories />
      <PromoSection />
      <FeaturedGames />
      <LatestTransactions />
      <Newsletter />
    </div>
  );
};