import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import ContentCard from './ContentCard';
import { setTrending } from '../redux/dashboardSlice';
import { fetchTrendingNews, fetchTrendingMovies, fetchTrendingSocial } from '../components/utils/api';

const TrendingSection = () => {
  const dispatch = useDispatch();
  const { trending } = useSelector((state) => state.dashboard);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trendingNews = await fetchTrendingNews();
        const trendingMovies = await fetchTrendingMovies();
        const trendingSocial = await fetchTrendingSocial();
        const trendingContent = [...trendingNews, ...trendingMovies, ...trendingSocial].slice(0, 6);
        dispatch(setTrending(trendingContent));
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    };
    loadTrending();
  }, [dispatch]);

  return (
    <motion.section
      id="trending"
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Trending</h2>
      {trending.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No trending content available.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {trending.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default TrendingSection;