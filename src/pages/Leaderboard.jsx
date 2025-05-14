import { useState, useEffect } from "react";
import {
  Trophy,
  Medal,
  Filter,
  ChevronDown,
  Search,
  Calendar,
  Award,
  User,
  Clock,
} from "lucide-react";

// Mock data for demonstration
const generateMockData = () => {
  const categories = [
    "General Knowledge",
    "Science",
    "History",
    "Geography",
    "Entertainment",
    "Sports",
  ];

  const users = [
    "AlexQuizMaster",
    "QuizWizard",
    "BrainiacBob",
    "TriviaQueen",
    "KnowledgeKing",
    "QuizNinja",
    "FactFinder",
    "WisdomSeeker",
    "QuizChampion",
    "MindMaster",
    "TriviaGuru",
    "BrainBox",
    "QuizWhiz",
    "KnowledgeHunter",
    "FactMaster",
    "QuizGenius",
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    username: users[Math.floor(Math.random() * users.length)],
    score: Math.floor(Math.random() * 50) + 10,
    category: categories[Math.floor(Math.random() * categories.length)],
    difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar: `/placeholder.svg?height=40&width=40`,
  })).sort((a, b) => b.score - a.score);
};

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    timeframe: "all-time",
    category: "all",
    difficulty: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  // Simulate loading data from an API
  useEffect(() => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const data = generateMockData();
      setLeaderboardData(data);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters and search
  const filteredData = leaderboardData.filter((entry) => {
    // Apply category filter
    if (filter.category !== "all" && entry.category !== filter.category)
      return false;

    // Apply difficulty filter
    if (filter.difficulty !== "all" && entry.difficulty !== filter.difficulty)
      return false;

    // Apply timeframe filter
    if (filter.timeframe !== "all-time") {
      const entryDate = new Date(entry.date);
      const now = new Date();

      if (filter.timeframe === "today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (entryDate < today) return false;
      } else if (filter.timeframe === "this-week") {
        const weekStart = new Date();
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        if (entryDate < weekStart) return false;
      } else if (filter.timeframe === "this-month") {
        const monthStart = new Date();
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);
        if (entryDate < monthStart) return false;
      }
    }

    // Apply search query
    if (
      searchQuery &&
      !entry.username.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-emerald-500";
      case "medium":
        return "text-amber-500";
      case "hard":
        return "text-rose-500";
      default:
        return "text-emerald-500";
    }
  };

  // Get rank badge
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="absolute -left-1 -top-1 bg-amber-500 text-white p-1 rounded-full">
          <Trophy className="h-5 w-5" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="absolute -left-1 -top-1 bg-slate-400 text-white p-1 rounded-full">
          <Medal className="h-5 w-5" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="absolute -left-1 -top-1 bg-amber-700 text-white p-1 rounded-full">
          <Medal className="h-5 w-5" />
        </div>
      );
    }
    return null;
  };

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(leaderboardData.map((entry) => entry.category)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white pb-12">
      {/* Header */}
      <header className="py-4 px-4 border-b border-slate-700 mb-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Quiz Leaderboard
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <Trophy className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Top Score</p>
              <p className="text-xl font-bold">
                {leaderboardData[0]?.score || 0}
              </p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <User className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Players</p>
              <p className="text-xl font-bold">{leaderboardData.length}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <Award className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Your Best Rank</p>
              <p className="text-xl font-bold">
                {leaderboardData.findIndex(
                  (entry) => entry.username === "You"
                ) + 1 || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-lg border border-slate-700">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search players..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 transition"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-slate-700/50 rounded-lg">
              {/* Time Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Time Period
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={filter.timeframe}
                  onChange={(e) => {
                    setFilter({ ...filter, timeframe: e.target.value });
                    setCurrentPage(1);
                  }}
                >
                  <option value="all-time">All Time</option>
                  <option value="today">Today</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Category
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={filter.category}
                  onChange={(e) => {
                    setFilter({ ...filter, category: e.target.value });
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Categories</option>
                  {categories
                    .filter((cat) => cat !== "all")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4" /> Difficulty
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={filter.difficulty}
                  onChange={(e) => {
                    setFilter({ ...filter, difficulty: e.target.value });
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 mb-8">
          <div className="p-4 bg-gradient-to-r from-amber-600 to-orange-600">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Players
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin mr-2">
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
              <p className="text-slate-300">Loading leaderboard data...</p>
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-400 text-lg">No results found</p>
              <p className="text-slate-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              {/* Table Header - Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-700 bg-slate-700/50 text-slate-300 font-medium">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-4">Player</div>
                <div className="col-span-2 text-center">Score</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-2">Difficulty</div>
              </div>

              {/* Leaderboard Entries */}
              <div className="divide-y divide-slate-700">
                {paginatedData.map((entry, index) => {
                  const rank = (currentPage - 1) * itemsPerPage + index + 1;

                  return (
                    <div
                      key={entry.id}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-slate-700/30 transition ${
                        rank <= 3 ? "bg-slate-700/20" : ""
                      }`}
                    >
                      {/* Mobile View */}
                      <div className="md:hidden grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-2 relative">
                          {getRankBadge(rank)}
                          <div
                            className={`w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold ${
                              rank <= 3 ? "bg-amber-500/20 text-amber-400" : ""
                            }`}
                          >
                            {rank}
                          </div>
                        </div>

                        <div className="col-span-6">
                          <div className="font-medium">{entry.username}</div>
                          <div className="text-sm text-slate-400">
                            {entry.category}
                          </div>
                        </div>

                        <div className="col-span-4 text-right">
                          <div className="text-xl font-bold text-amber-400">
                            {entry.score}
                          </div>
                          <div
                            className={`text-sm capitalize ${getDifficultyColor(
                              entry.difficulty
                            )}`}
                          >
                            {entry.difficulty}
                          </div>
                        </div>
                      </div>

                      {/* Desktop View */}
                      <div className="hidden md:block col-span-1 text-center relative">
                        {getRankBadge(rank)}
                        <div
                          className={`w-8 h-8 rounded-full bg-slate-700 mx-auto flex items-center justify-center font-bold ${
                            rank <= 3 ? "bg-amber-500/20 text-amber-400" : ""
                          }`}
                        >
                          {rank}
                        </div>
                      </div>

                      <div className="hidden md:flex col-span-4 items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                          <img
                            src={entry.avatar || "/placeholder.svg"}
                            alt={entry.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-medium">{entry.username}</div>
                      </div>

                      <div className="hidden md:flex col-span-2 items-center justify-center">
                        <div className="text-2xl font-bold text-amber-400">
                          {entry.score}
                        </div>
                      </div>

                      <div className="hidden md:block col-span-3">
                        {entry.category}
                      </div>

                      <div className="hidden md:block col-span-2 capitalize">
                        <span
                          className={`font-medium ${getDifficultyColor(
                            entry.difficulty
                          )}`}
                        >
                          {entry.difficulty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <div className="flex items-center px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
