/* eslint-disable no-unused-vars */
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  StarIcon,
  FilmIcon,
  NewspaperIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";
import {
  addFavorite,
  removeFavorite,
  reorderFeed,
} from "../redux/dashboardSlice";

const ContentCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.dashboard.favorites);
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item) {
      if (item.index !== index) {
        dispatch(reorderFeed({ fromIndex: item.index, toIndex: index }));
        item.index = index;
      }
    },
  });

  const getIcon = (type) => {
    switch (type) {
      case "movie":
        return <FilmIcon className="w-5 h-5 text-blue-500" />;
      case "social":
        return <ChatBubbleLeftIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <NewspaperIcon className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`p-5 rounded-xl content-card ${isDragging ? "opacity-50" : "opacity-100"}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="relative">
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-2 left-2 bg-white/80 dark:bg-gray-800/80 p-1.5 rounded-full">
          {getIcon(item.type)}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {item.description}
      </p>
      <div className="flex justify-between items-center">
        <a
          href={item.url}
          className="icon-button text-blue-500 hover:text-blue-600 font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          {getIcon(item.type)}
          <span>
            {item.type === "movie"
              ? "View Movie"
              : item.type === "social"
                ? "View Post"
                : "Read More"}
          </span>
        </a>
        <motion.button
          onClick={() =>
            dispatch(isFavorite ? removeFavorite(item.id) : addFavorite(item))
          }
          className="icon-button text-yellow-400 hover:text-yellow-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <StarIcon className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(ContentCard);
