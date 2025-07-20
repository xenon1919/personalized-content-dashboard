import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { setSearchQuery } from '../redux/dashboardSlice';
import debounce from '../components/utils/debounce';

const Header = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const debouncedSearch = debounce((value) => {
    console.log('Dispatching search query:', value);
    dispatch(setSearchQuery(value));
  }, 500);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <motion.header
      className="p-5 glass-container shadow-lg flex items-center gap-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="relative flex-1 max-w-md">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search content..."
          className="w-full p-2.5 pl-10 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </motion.header>
  );
};

export default Header;