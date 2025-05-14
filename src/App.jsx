import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizInfinite from "./pages/gameModes/QuizInfinite";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import { Brain } from "lucide-react";

function App() {
  return (
    <Router>
      {/* Header */}
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <header className="py-6 px-4 border-b border-slate-700">
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:mode/:categoryId" element={<QuizInfinite />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-slate-700 text-center text-slate-400">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-6 w-6 text-amber-400" />
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                QuizMaster
              </h2>
            </div>
            <p className="mb-4">
              © {new Date().getFullYear()} QuizMaster. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
