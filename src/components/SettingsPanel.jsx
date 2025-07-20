/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { setPreferences } from "../redux/dashboardSlice";

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.dashboard.preferences);
  const [categories, setCategories] = useState(preferences.categories);
  const [darkMode, setDarkMode] = useState(preferences.darkMode);

  const handleSave = () => {
    dispatch(setPreferences({ categories, darkMode }));
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  };

  const availableCategories = [
    "technology",
    "sports",
    "entertainment",
    "business",
    "movies",
    "music",
    "social",
  ];

  return (
    <motion.section
      id="settings"
      className="mb-12 p-6 glass-container rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Cog6ToothIcon className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
      </div>
      <div className="mb-6">
        <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-200">
          Categories
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => {
                  setCategories((prev) =>
                    prev.includes(cat)
                      ? prev.filter((c) => c !== cat)
                      : [...prev, cat]
                  );
                }}
                className="w-5 h-5 accent-blue-500 rounded"
              />
              <span className="text-gray-600 dark:text-gray-300">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="w-5 h-5 accent-blue-500 rounded"
          />
          <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
        </label>
      </div>
      <motion.button
        onClick={handleSave}
        className="icon-button bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2.5 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save Settings
      </motion.button>
    </motion.section>
  );
};

export default SettingsPanel;
