import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ContentCard from './ContentCard';

const FavoritesSection = () => {
  const { favorites } = useSelector((state) => state.dashboard);

  return (
    <motion.section
      id="favorites"
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No favorites added yet.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {favorites.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default FavoritesSection;