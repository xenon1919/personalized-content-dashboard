const mockNews = [
  {
    id: 1,
    category: "technology",
    title: "AI Breakthrough in 2025",
    description: "New AI model achieves human-like reasoning.",
    image: "https://via.placeholder.com/150",
    url: "#",
  },
  {
    id: 2,
    category: "sports",
    title: "World Cup Highlights",
    description: "Exciting moments from the 2025 World Cup.",
    image: "https://via.placeholder.com/150",
    url: "#",
  },
  {
    id: 3,
    category: "finance",
    title: "Stock Market Surge",
    description: "Tech stocks lead the market rally.",
    image: "https://via.placeholder.com/150",
    url: "#",
  },
];

const mockRecommendations = [
  {
    id: 4,
    category: "movies",
    title: "Sci-Fi Blockbuster",
    description: "A thrilling space adventure.",
    image: "https://via.placeholder.com/150",
    url: "#",
  },
  {
    id: 5,
    category: "music",
    title: "New Album Release",
    description: "Latest hits from top artists.",
    image: "https://via.placeholder.com/150",
    url: "#",
  },
];

const mockSocialPosts = [
  {
    id: 6,
    category: "social",
    title: "Tech Tweet",
    description: "Latest tech trends on Twitter.",
    image: "https://via.placeholder.com/150",
    url: "#",
  },
  {
    id: 7,
    category: "social",
    title: "Insta Post",
    description: "Viral Instagram post.",
    image: "https://via.placeholder.com/150",
    url: "#",
  },
];

export const fetchContent = async (categories, searchQuery) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  let allContent = [...mockNews, ...mockRecommendations, ...mockSocialPosts];
  if (searchQuery) {
    allContent = allContent.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return allContent.filter((item) => categories.includes(item.category));
};

export const fetchTrending = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return [...mockNews, ...mockRecommendations].slice(0, 3);
};
