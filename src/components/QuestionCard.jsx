"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

export default function QuestionCard({
  question,
  answers,
  correct,
  onAnswer,
  current,
  total,
  answerState,
  difficulty,
}) {
  const [selected, setSelected] = useState(null);
  const [animation, setAnimation] = useState("");

  // Reset selection when question changes
  useEffect(() => {
    setSelected(null);
    setAnimation("animate-fadeIn");

    // Remove animation class after animation completes
    const timer = setTimeout(() => {
      setAnimation("");
    }, 500);

    return () => clearTimeout(timer);
  }, [question]);

  const handleSelect = (ans) => {
    if (selected !== null) return;
    setSelected(ans);
    onAnswer(ans);
  };

  // Get difficulty-based styles
  const getDifficultyStyles = () => {
    switch (difficulty) {
      case "easy":
        return "from-emerald-500 to-teal-600";
      case "medium":
        return "from-amber-500 to-orange-600";
      case "hard":
        return "from-rose-500 to-red-600";
      default:
        return "from-emerald-500 to-teal-600";
    }
  };

  // Get button styles based on selection state
  const getButtonStyle = (ans) => {
    const baseClasses =
      "w-full px-6 py-4 rounded-lg text-left transition-all duration-300 flex items-center border";

    if (selected === null) {
      return `${baseClasses} bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-slate-500 hover:translate-x-1`;
    }

    if (ans === correct) {
      return `${baseClasses} bg-emerald-900/40 border-emerald-600 text-emerald-100`;
    }

    if (ans === selected && ans !== correct) {
      return `${baseClasses} bg-rose-900/40 border-rose-600 text-rose-100`;
    }

    return `${baseClasses} bg-slate-800/50 border-slate-700 text-slate-400`;
  };

  // Get icon for answer option
  const getAnswerIcon = (ans) => {
    if (selected === null) return null;

    if (ans === correct) {
      return (
        <CheckCircle className="h-5 w-5 text-emerald-400 ml-2 flex-shrink-0" />
      );
    }

    if (ans === selected && ans !== correct) {
      return <XCircle className="h-5 w-5 text-rose-400 ml-2 flex-shrink-0" />;
    }

    return null;
  };

  return (
    <div
      className={`bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden ${animation}`}
    >
      {/* Question header with progress */}
      <div className={`bg-gradient-to-r ${getDifficultyStyles()} px-6 py-4`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Question {current + 1} {total !== "∞" ? `/ ${total}` : ""}
          </h2>
          <div className="text-sm font-medium text-white/80 capitalize">
            {difficulty} difficulty
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="p-6">
        <p className="text-lg font-medium mb-6 text-slate-100 leading-relaxed">
          {question}
        </p>

        {/* Answer options */}
        <div className="space-y-3">
          {answers.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(ans)}
              disabled={selected !== null}
              className={getButtonStyle(ans)}
            >
              <span className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center mr-3 flex-shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-grow">{ans}</span>
              {getAnswerIcon(ans)}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback area */}
      {selected && (
        <div
          className={`p-4 text-center font-medium ${
            answerState
              ? "bg-emerald-900/30 text-emerald-300"
              : "bg-rose-900/30 text-rose-300"
          }`}
        >
          {answerState
            ? "Correct! Loading next question..."
            : "Incorrect. Your streak has been reset."}
        </div>
      )}
    </div>
  );
}
