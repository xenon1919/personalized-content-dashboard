import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon, FireIcon, HeartIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'feed', label: 'Feed', icon: HomeIcon },
    { id: 'trending', label: 'Trending', icon: FireIcon },
    { id: 'favorites', label: 'Favorites', icon: HeartIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
  ];

  return (
    <motion.aside
      className="w-64 p-6 glass-container"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Explore</h2>
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.id}>
            <motion.button
              onClick={() => scrollToSection(item.id)}
              className="icon-button w-full flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium text-left"
              whileHover={{ x: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;