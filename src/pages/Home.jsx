import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Infinity, Clock, Trophy, Loader2 } from "lucide-react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMode, setSelectedMode] = useState("infinity");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Get a color for each category based on its ID
  const getCategoryColor = (id) => {
    const colors = [
      "bg-emerald-600 hover:bg-emerald-700",
      "bg-purple-600 hover:bg-purple-700",
      "bg-amber-600 hover:bg-amber-700",
      "bg-rose-600 hover:bg-rose-700",
      "bg-cyan-600 hover:bg-cyan-700",
      "bg-indigo-600 hover:bg-indigo-700",
    ];
    return colors[id % colors.length];
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          Test Your Knowledge
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Challenge yourself with thousands of questions across multiple
          categories and game modes.
        </p>
      </section>

      {/* Game Modes */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Choose Your Game Mode
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Infinity Mode Card */}
          <div
            className={`rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedMode === "infinity"
                ? "border-amber-400 bg-slate-800/80"
                : "border-slate-700 bg-slate-800/40 hover:border-slate-500"
            }`}
            onClick={() => {
              setSelectedMode("infinity");
              if (selectedCategory) {
                navigate(`/quiz/infinity/${selectedCategory.id}`);
              }
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <Infinity className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold">Infinity Mode</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Keep answering questions as long as you can. Test your knowledge
              across your chosen category with no time limits.
            </p>
            <div className="flex justify-end">
              <span className="text-amber-400 font-medium">Available Now</span>
            </div>
          </div>

          {/* Classic Mode Card */}
          <div
            className={`rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedMode === "classic"
                ? "border-amber-400 bg-slate-800/80"
                : "border-slate-700 bg-slate-800/40 hover:border-slate-500"
            }`}
            onClick={() => {
              setSelectedMode("classic");
              if (selectedCategory) {
                navigate(`/quiz/classic/${selectedCategory.id}`);
              }
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Trophy className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold">Classic Mode</h3>
            </div>
            <p className="text-slate-300 mb-4">
              10 questions, 3 lives. How far can you go? Compete for the highest
              score and climb the leaderboard.
            </p>
            <div className="flex justify-end">
              <span className="text-slate-400 font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          {selectedMode === "infinity"
            ? "Select a Category for Infinity Mode"
            : "Categories Coming Soon for Classic Mode"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 text-amber-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {selectedMode === "infinity" &&
              categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${getCategoryColor(cat.id)} ${
                    selectedCategory?.id === cat.id
                      ? "ring-4 ring-amber-400"
                      : ""
                  } text-white px-6 py-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center min-h-[100px]`}
                >
                  <span className="font-bold text-lg text-center">
                    {cat.name}
                  </span>
                </button>
              ))}

            {selectedMode === "classic" && (
              <div className="col-span-full text-center py-12 text-slate-400">
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">
                  Classic Mode categories will be available soon!
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
