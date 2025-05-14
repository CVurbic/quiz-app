import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-amber-400" />
        <h1 className="text-2xl font-bold">QuizMaster</h1>
      </div>
      <nav>
        <ul className="flex gap-6">
          <li className="hover:text-amber-400 transition cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-amber-400 transition cursor-pointer">
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li className="hover:text-amber-400 transition cursor-pointer">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
