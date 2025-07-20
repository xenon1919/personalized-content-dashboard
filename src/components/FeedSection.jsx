import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import ContentCard from './ContentCard';
import { setFeed } from '../redux/dashboardSlice';
import { fetchNews, fetchMovies, fetchSocialPosts } from '../components/utils/api';
import debounce from '../components/utils/debounce';

const FeedSection = () => {
  const dispatch = useDispatch();
  const { preferences, searchQuery, feed } = useSelector((state) => state.dashboard);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    dispatch(setFeed([]));
    setPage(1);
  }, [preferences.categories, searchQuery, dispatch]);

  useEffect(() => {
    const loadContent = async () => {
      if (loading) return;
      setLoading(true);
      try {
        let newContent = [];
        if (preferences.categories.includes('technology') || preferences.categories.includes('business') || preferences.categories.includes('sports')) {
          const news = await fetchNews(preferences.categories, searchQuery, page);
          newContent = [...newContent, ...news];
        }
        if (preferences.categories.includes('movies')) {
          const movies = await fetchMovies(searchQuery, page);
          newContent = [...newContent, ...movies];
        }
        if (preferences.categories.includes('social')) {
          const social = await fetchSocialPosts(searchQuery, page);
          newContent = [...newContent, ...social];
        }
        dispatch(setFeed([...feed, ...newContent]));
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [page, dispatch, preferences.categories, searchQuery, feed]);

  const debouncedSetPage = debounce(() => {
    setPage((prev) => prev + 1);
  }, 500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          debouncedSetPage();
        }
      },
      { threshold: 0.5 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, debouncedSetPage]);

  return (
    <motion.section
      id="feed"
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Personalized Feed</h2>
      {feed.length === 0 && !loading ? (
        <p className="text-gray-600 dark:text-gray-300">No content available. Try adjusting your preferences.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {feed.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      )}
      {loading && <div className="loader"></div>}
      <div ref={loaderRef} className="h-10" />
    </motion.section>
  );
};

export default FeedSection;