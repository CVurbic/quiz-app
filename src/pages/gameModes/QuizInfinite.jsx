import { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import { useParams } from "react-router-dom";
import { Award, TrendingUp, RotateCcw, Clock } from "lucide-react";

export default function QuizInfinite() {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [history, setHistory] = useState([]);
  const [answerState, setAnswerState] = useState(null); // null | true | false
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [questionPool, setQuestionPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [token, setToken] = useState("");

  const { categoryId } = useParams();

  const decodeHTML = (str) =>
    new DOMParser().parseFromString(str, "text/html").body.textContent;

  const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    // Fetch category name
    const fetchCategoryName = async () => {
      try {
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        const category = data.trivia_categories.find(
          (cat) => cat.id.toString() === categoryId
        );
        setCategoryName(category?.name || "Quiz");
      } catch (error) {
        console.error("Failed to fetch category name:", error);
      }
    };
    const clearToken = async () => {
      localStorage.removeItem("quizToken");
      setToken("");
    };

    clearToken();
    fetchCategoryName();
  }, [categoryId]);

  const prefetchQuestions = async () => {
    const now = Date.now();
    if (!token) return;

    if (now - lastFetchTime < 5000) {
      console.warn("Waiting due to rate limit...");
      return;
    }

    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple&token=${token}`
      );
      const data = await res.json();
      console.log(data);
      if (data.response_code === 5) {
        console.warn("Rate limit hit — waiting 5s...");
        setTimeout(prefetchQuestions, 5000); // pokušaj ponovno za 5s
        return;
      }

      if (!data.results || data.results.length === 0) {
        console.warn("No questions available for this query.");
        return;
      }
      if (data.response_code === 1) {
        console.warn("No questions available for this query.");
        return;
      }
      if (data.response_code === 4) {
        console.warn("Token exhausted — resetting...");
        await resetToken();
        return;
      }
      const pool = data.results.map((q) => ({
        question: decodeHTML(q.question),
        correct: decodeHTML(q.correct_answer),
        answers: shuffle([
          ...q.incorrect_answers.map(decodeHTML),
          decodeHTML(q.correct_answer),
        ]),
      }));

      setQuestionPool(pool);
      setCurrentIndex(0);
      setLastFetchTime(Date.now());
    } catch (error) {
      console.error("Failed to prefetch questions:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      prefetchQuestions();
    }
    //eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    let didCancel = false;

    const run = async () => {
      if (!didCancel) {
        await prefetchQuestions();
      }
    };

    run();

    return () => {
      didCancel = true;
    };
    //eslint-disable-next-line
  }, [categoryId, difficulty]);

  const getToken = async () => {
    const saved = localStorage.getItem("quizToken");
    if (saved) {
      setToken(saved);
      return;
    }

    try {
      const res = await fetch(
        "https://opentdb.com/api_token.php?command=request"
      );
      const data = await res.json();
      if (data.response_code === 0) {
        setToken(data.token);
        localStorage.setItem("quizToken", data.token);
      } else {
        console.error("Token request failed");
      }
    } catch (err) {
      console.error("Error fetching token:", err);
    }
  };

  const resetToken = async () => {
    try {
      const res = await fetch(
        `https://opentdb.com/api_token.php?command=reset&token=${token}`
      );
      const data = await res.json();
      if (data.response_code === 0) {
        console.log("Token reset successful");
        await prefetchQuestions(); // ponovno pokreni dohvat
      } else {
        console.error("Token reset failed");
      }
    } catch (err) {
      console.error("Error resetting token:", err);
    }
  };
  const showNextQuestion = async () => {
    setAnswerState(null);

    if (currentIndex + 1 < questionPool.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await prefetchQuestions();
    }
  };

  const handleAnswer = (selected) => {
    const isCorrect = selected === questionPool[currentIndex].correct;
    setAnswerState(isCorrect);

    setHistory((prev) => [
      {
        question: questionPool[currentIndex].question,
        selected,
        correct: questionPool[currentIndex].correct,
        isCorrect,
      },
      ...prev.slice(0, 4),
    ]);

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= 12) setDifficulty("hard");
      else if (newScore >= 6) setDifficulty("medium");

      const oldScore = Number(localStorage.getItem("quizHighScore") || 0);
      if (newScore > oldScore) {
        localStorage.setItem("quizHighScore", newScore);
      }
    } else {
      setScore(0);
      setDifficulty("easy");
    }

    // Delay before loading next question
    setTimeout(async () => {
      setAnswerState(null);
      await await showNextQuestion();
    }, 1500);
  };

  // Get difficulty color
  const getDifficultyColor = () => {
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

  // Get high score from localStorage
  const highScore = Number(localStorage.getItem("quizHighScore") || 0);

  if (questionPool.length === 0 && loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <div className="animate-spin mb-4">
          <Clock className="h-12 w-12 text-amber-500" />
        </div>
        <p className="text-lg font-medium text-slate-700">
          Loading question...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white pb-12">
      {/* Header */}
      <header className="py-4 px-4 border-b border-slate-700 mb-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            {categoryName} - Infinity Mode
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        {/* Score and Stats Panel */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 shadow-lg border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <RotateCcw className="h-5 w-5 text-amber-400" />
                <span className="text-slate-300 font-medium">
                  Current Streak
                </span>
              </div>
              <span className="text-3xl font-bold text-white">{score}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-amber-400" />
                <span className="text-slate-300 font-medium">High Score</span>
              </div>
              <span className="text-3xl font-bold text-white">{highScore}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <span className="text-slate-300 font-medium">Difficulty</span>
              </div>
              <span
                className={`text-2xl font-bold capitalize ${getDifficultyColor()}`}
              >
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        {questionPool.length > 0 && questionPool[currentIndex] && (
          <div className="mb-8 transition-all duration-300 transform">
            <QuestionCard
              question={questionPool[currentIndex].question}
              answers={questionPool[currentIndex].answers}
              correct={questionPool[currentIndex].correct}
              onAnswer={handleAnswer}
              current={score}
              total="∞"
              answerState={answerState}
              difficulty={difficulty}
            />
          </div>
        )}

        {/* Answer History */}
        <div className="mt-12 bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
            <Clock className="h-5 w-5" />
            Answer History
          </h3>

          {history.length === 0 ? (
            <p className="text-slate-400 text-center py-6">
              Your answer history will appear here
            </p>
          ) : (
            <ul className="space-y-3">
              {history.map((h, idx) => (
                <li
                  key={idx}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    h.isCorrect
                      ? "bg-emerald-900/20 border-emerald-700"
                      : "bg-rose-900/20 border-rose-700"
                  }`}
                >
                  <p className="font-medium mb-2 text-slate-200">
                    {h.question}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="text-slate-400">Your answer:</span>
                    <span
                      className={
                        h.isCorrect
                          ? "text-emerald-400 font-medium"
                          : "text-rose-400 font-medium"
                      }
                    >
                      {h.selected}
                    </span>

                    {!h.isCorrect && (
                      <>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-400">Correct answer:</span>
                        <span className="text-emerald-400 font-medium">
                          {h.correct}
                        </span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
