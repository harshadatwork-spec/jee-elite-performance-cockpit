import React, { useState, useEffect } from "react";
import { Question } from "../types";
import { MOCK_QUESTIONS } from "../constants";

export const TestInterface: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optIndex: number) => {
    if (isSubmitted) return;
    const newQs = [...questions];
    newQs[currentIndex].selectedAnswer = optIndex;
    setQuestions(newQs);
  };

  const calculateResult = () => {
    let score = 0;
    let correct = 0;
    let attempted = 0;

    questions.forEach((q) => {
      if (q.selectedAnswer !== null) {
        attempted++;
        if (q.selectedAnswer === q.correctAnswer) {
          score += 4;
          correct++;
        } else {
          score -= 1;
        }
      }
    });

    return {
      score,
      correct,
      attempted,
      accuracy:
        attempted > 0 ? ((correct / attempted) * 100).toFixed(2) : 0,
    };
  };

  const handleSubmit = () => {
    const res = calculateResult();
    setResult(res);
    setIsSubmitted(true);
  };

  const downloadAnalysis = () => {
    window.print();
  };

  const q = questions[currentIndex];

  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-3xl font-bold mb-6">
          Test Analysis
        </h1>

        <div className="bg-zinc-900 p-6 rounded-2xl mb-6">
          <p>Total Score: {result.score}</p>
          <p>Attempted: {result.attempted}</p>
          <p>Correct: {result.correct}</p>
          <p>Accuracy: {result.accuracy}%</p>
        </div>

        <div className="mb-8 text-sm text-gray-400">
          ⚠ Results are temporary. If you close this tab,
          they will disappear.
        </div>

        <button
          onClick={downloadAnalysis}
          className="px-6 py-3 bg-blue-600 rounded-lg font-bold"
        >
          Download Analysis (PDF)
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col">
      <header className="h-16 px-8 flex items-center justify-between border-b border-white/10">
        <h2 className="font-bold text-lg">
          Free JEE Mock Test
        </h2>
        <span className="font-mono text-blue-400">
          {formatTime(timeLeft)}
        </span>
      </header>

      <main className="flex-1 p-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl mb-8">
            Question {currentIndex + 1}
          </p>

          <p className="mb-8">{q.text}</p>

          <div className="space-y-4">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(i)}
                className={`w-full p-4 rounded-lg border ${q.selectedAnswer === i
                  ? "bg-blue-600"
                  : "bg-zinc-900"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex((prev) => prev - 1)
              }
              className="px-4 py-2 bg-zinc-800 rounded"
            >
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-emerald-600 rounded"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentIndex((prev) => prev + 1)
                }
                className="px-6 py-2 bg-blue-600 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};