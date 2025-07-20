const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // This key looks like a TMDb v4 Access Token (JWT).
// Note: TMDb v3 endpoints (like /3/search/movie) usually require a v3 API Key (a simpler string),
// NOT the v4 JWT. Ensure you are using the correct key for v3 calls, or switch to v4 endpoints if using the JWT.
const AYRSHARE_API_KEY = import.meta.env.VITE_AYRSHARE_API_KEY;

const mockNews = [
  {
    id: "mock1",
    category: "technology",
    title: "AI Breakthrough",
    description: "New AI model achieves human-like reasoning.",
    image: "https://via.placeholder.com/150",
    url: "#",
    type: "news",
  },
  {
    id: "mock2",
    category: "sports",
    title: "World Cup Highlights",
    description: "Exciting moments from the 2025 World Cup.",
    image: "https://via.placeholder.com/150",
    url: "#",
    type: "news",
  },
];

const mockMovies = [
  {
    id: "mock3",
    category: "movies",
    title: "Sci-Fi Blockbuster",
    description: "A thrilling space adventure.",
    image: "https://via.placeholder.com/150",
    url: "#",
    type: "movie",
  },
];

const mockSocialPosts = [
  {
    id: "mock4",
    category: "social",
    title: "Tech Tweet",
    description: "Latest tech trends on Twitter.",
    image: "https://via.placeholder.com/150",
    url: "#",
    type: "social",
  },
];

export const fetchNews = async (categories, query, page) => {
  if (!NEWS_API_KEY) {
    console.warn("News API key missing, using mock data");
    return mockNews;
  }
  try {
    let url;
    // Default to 'us' country for top-headlines if no specific query is provided
    const defaultCountry = "us";
    const selectedCategory =
      categories.find((cat) =>
        ["technology", "business", "sports"].includes(cat)
      ) || "technology";

    if (query) {
      // Use 'everything' endpoint for general queries
      url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=5`;
    } else {
      // Use 'top-headlines' endpoint for category-based Browse
      url = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=${defaultCountry}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=5`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "News API error");

    return data.articles.map((article, index) => ({
      id: `news-${article.url}-${index}`,
      category: selectedCategory, // Use the actual category if no query, or infer from context
      title: article.title,
      description: article.description || "No description available.",
      image: article.urlToImage,
      url: article.url,
      type: "news",
    }));
  } catch (error) {
    console.error("News API error:", error);
    return mockNews;
  }
};

export const fetchMovies = async (query, page) => {
  if (!TMDB_API_KEY) {
    console.warn("TMDB API key missing, using mock data");
    return mockMovies;
  }
  try {
    // Note: This endpoint (v3) typically expects a v3 API key, not a v4 JWT.
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query || "popular"}&page=${page}`
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.status_message || "TMDB API error");

    // Filter to only include movies that have a poster_path
    return data.results
      .filter((movie) => movie.poster_path) // <-- Added this filter line
      .map((movie, index) => ({
        id: `movie-${movie.id}-${index}`,
        category: "movies",
        title: movie.title,
        description: movie.overview || "No description available.",
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Image is guaranteed to exist now
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        type: "movie",
      }));
  } catch (error) {
    console.error("TMDB API error:", error);
    return mockMovies;
  }
};

export const fetchSocialPosts = async (query, page) => {
  if (!AYRSHARE_API_KEY) {
    console.warn("Ayrshare API key missing, using mock data");
    return mockSocialPosts;
  }
  try {
    // Moved API key to Authorization header for better security and standard practice
    const response = await fetch(
      `https://app.ayrshare.com/api/post?hashtags=${query || "tech"}&page=${page}&limit=5`,
      {
        method: "GET", // Explicitly define method, though GET is default for fetch without body
        headers: {
          Authorization: `Bearer ${AYRSHARE_API_KEY}`,
          "Content-Type": "application/json", // Often good to include, though might not be strictly needed for GET
        },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Ayrshare API error");
    return data.posts.map((post, index) => ({
      id: `social-${post.id}-${index}`,
      category: "social",
      title: post.title || post.post.substring(0, 50) + "...",
      description: post.post || "No description available.",
      image: post.imageUrl || null,
      url: post.permalink || "#",
      type: "social",
    }));
  } catch (error) {
    console.error("Ayrshare API error:", error);
    return mockSocialPosts;
  }
};

export const fetchTrendingNews = async () => {
  if (!NEWS_API_KEY) {
    console.warn("News API key missing, using mock data");
    return mockNews.slice(0, 2);
  }
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}&pageSize=2`
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Trending News API error");
    return data.articles.map((article, index) => ({
      id: `trending-news-${article.url}-${index}`,
      category: "news",
      title: article.title,
      description: article.description || "No description available.",
      image: article.urlToImage,
      url: article.url,
      type: "news",
    }));
  } catch (error) {
    console.error("Trending News API error:", error);
    return mockNews.slice(0, 2);
  }
};

export const fetchTrendingMovies = async () => {
  if (!TMDB_API_KEY) {
    console.warn("TMDB API key missing, using mock data");
    return mockMovies.slice(0, 2);
  }
  try {
    // Note: This endpoint (v3) typically expects a v3 API key, not a v4 JWT.
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.status_message || "Trending TMDB API error");

    // Filter to only include trending movies that have a poster_path
    return data.results
      .filter((movie) => movie.poster_path) // <-- Added this filter line
      .slice(0, 2) // Keep the slice here to limit to 2 trending movies *after* filtering
      .map((movie, index) => ({
        id: `trending-movie-${movie.id}-${index}`,
        category: "movies",
        title: movie.title,
        description: movie.overview || "No description available.",
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Image is guaranteed to exist now
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        type: "movie",
      }));
  } catch (error) {
    console.error("Trending TMDB API error:", error);
    return mockMovies.slice(0, 2);
  }
};

export const fetchTrendingSocial = async () => {
  if (!AYRSHARE_API_KEY) {
    console.warn("Ayrshare API key missing, using mock data");
    return mockSocialPosts.slice(0, 2);
  }
  try {
    // Moved API key to Authorization header for better security and standard practice
    const response = await fetch(
      `https://app.ayrshare.com/api/post?hashtags=trending&limit=2`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AYRSHARE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Trending Ayrshare API error");
    return data.posts.map((post, index) => ({
      id: `trending-social-${post.id}-${index}`,
      category: "social",
      title: post.title || post.post.substring(0, 50) + "...",
      description: post.post || "No description available.",
      image: post.imageUrl || null,
      url: post.permalink || "#",
      type: "social",
    }));
  } catch (error) {
    console.error("Trending Ayrshare API error:", error);
    return mockSocialPosts.slice(0, 2);
  }
};
