import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FeedSection from "./components/FeedSection";
import TrendingSection from "./components/TrendingSection";
import FavoritesSection from "./components/FavoritesSection";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
        <Sidebar />
        <div className="flex-1 flex flex-col glass-container m-6 rounded-3xl shadow-xl">
          <Header />
          <main className="p-8 flex-1">
            <FeedSection />
            <TrendingSection />
            <FavoritesSection />
          </main>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
