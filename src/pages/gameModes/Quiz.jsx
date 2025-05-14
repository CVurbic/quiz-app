import { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!hasStarted) return;
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.results) {
          const formatted = data.results.map((q) => ({
            question: decodeURIComponent(q.question),
            correct: decodeURIComponent(q.correct_answer),
            answers: shuffle([
              ...q.incorrect_answers.map(decodeURIComponent),
              decodeURIComponent(q.correct_answer),
            ]),
          }));
          setQuestions(formatted);
        } else {
          throw new Error("No results found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [hasStarted]);

  const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

  const handleAnswer = (selected) => {
    const isCorrect = selected === questions[current].correct;
    if (isCorrect) setScore(score + 1);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (error) return <p className="p-4">Error: {error}</p>;

  if (loading) return <p className="p-4">Učitavanje pitanja...</p>;

  if (!questions.length && hasStarted)
    return <p className="p-4">Učitavanje pitanja...</p>;

  if (isFinished)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Rezultat</h2>
        <p className="text-lg">
          Osvojili ste {score} / {questions.length} bodova.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Igraj ponovno
        </button>
      </div>
    );

  return (
    <section className="p-6 max-w-2xl mx-auto">
      {hasStarted ? (
        <QuestionCard
          question={questions[current].question}
          answers={questions[current].answers}
          onAnswer={handleAnswer}
          current={current}
          total={questions.length}
        />
      ) : (
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Dobrodošli u kviz znanja</h1>
          <button
            onClick={() => setHasStarted(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Započni kviz
          </button>
        </div>
      )}
    </section>
  );
}
