import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferences: {
    categories: ["technology", "sports", "movies"],
    darkMode: false,
  },
  feed: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  trending: [],
  searchQuery: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPreferences(state, action) {
      state.preferences = action.payload;
      localStorage.setItem("preferences", JSON.stringify(action.payload));
    },
    setFeed(state, action) {
      state.feed = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setTrending(state, action) {
      state.trending = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    reorderFeed(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const item = state.feed.splice(fromIndex, 1)[0];
      state.feed.splice(toIndex, 0, item);
    },
  },
});

export const {
  setPreferences,
  setFeed,
  addFavorite,
  removeFavorite,
  setTrending,
  setSearchQuery,
  reorderFeed,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
