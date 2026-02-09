
import React, { useState, useEffect } from 'react';
import { Question, QuestionStatus, TestResult } from '../types';
import { MOCK_QUESTIONS, STATUS_COLORS } from '../constants';

interface TestInterfaceProps {
  onFinish: (result: TestResult) => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({ onFinish }) => {
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10800); // 3 hours
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optIndex: number) => {
    const newQs = [...questions];
    newQs[currentIndex].selectedAnswer = optIndex;
    newQs[currentIndex].status = QuestionStatus.ANSWERED;
    setQuestions(newQs);
  };

  const markForReview = () => {
    const newQs = [...questions];
    const q = newQs[currentIndex];
    q.status = q.selectedAnswer !== null ? QuestionStatus.ANSWERED_AND_MARKED : QuestionStatus.MARKED_FOR_REVIEW;
    setQuestions(newQs);
    goToNext();
  };

  const clearResponse = () => {
    const newQs = [...questions];
    newQs[currentIndex].selectedAnswer = null;
    newQs[currentIndex].status = QuestionStatus.NOT_ANSWERED;
    setQuestions(newQs);
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      if (questions[currentIndex].status === QuestionStatus.NOT_VISITED) {
        const newQs = [...questions];
        newQs[currentIndex].status = QuestionStatus.NOT_ANSWERED;
        setQuestions(newQs);
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const calculateSubject = (sub: 'Physics' | 'Chemistry' | 'Mathematics') => {
      const subQs = questions.filter(q => q.subject === sub);
      let score = 0;
      let correct = 0;
      let incorrect = 0;
      let attempted = 0;

      subQs.forEach(q => {
        if (q.selectedAnswer !== null) {
          attempted++;
          if (q.selectedAnswer === q.correctAnswer) {
            score += 4;
            correct++;
          } else {
            score -= 1;
            incorrect++;
          }
        }
      });

      return { score, attempted, correct, incorrect, total: subQs.length };
    };

    const physics = calculateSubject('Physics');
    const chemistry = calculateSubject('Chemistry');
    const mathematics = calculateSubject('Mathematics');

    const totalScore = physics.score + chemistry.score + mathematics.score;
    const totalAttempted = physics.attempted + chemistry.attempted + mathematics.attempted;
    const totalCorrect = physics.correct + chemistry.correct + mathematics.correct;
    const accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;

    const result: TestResult = {
      totalScore,
      maxScore: 360,
      accuracy,
      timeSpent: 10800 - timeLeft,
      questions: JSON.parse(JSON.stringify(questions)), // deep copy of state
      subjects: {
        Physics: physics,
        Chemistry: chemistry,
        Mathematics: mathematics
      }
    };

    onFinish(result);
  };

  const q = questions[currentIndex];
  const answeredCount = questions.filter(q => q.selectedAnswer !== null).length;

  return (
    <div className="h-full flex flex-col bg-[#09090b]">
      {/* Test Header */}
      <header className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-zinc-950/50">
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-lg tracking-tight">JEE MAIN MOCK #42</h2>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex gap-2">
            {['Physics', 'Chemistry', 'Mathematics'].map(sub => (
              <button
                key={sub}
                onClick={() => {
                  const firstIdx = sub === 'Physics' ? 0 : sub === 'Chemistry' ? 30 : 60;
                  setCurrentIndex(firstIdx);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  q.subject === sub ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Remaining</span>
            <span className="font-mono text-xl font-bold text-blue-400">{formatTime(timeLeft)}</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-emerald-900/20"
          >
            Submit Test
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-12 overflow-y-auto scroll-smooth">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Question {currentIndex + 1}</span>
              <div className="flex gap-4 text-xs font-medium bg-zinc-900 px-4 py-2 rounded-full border border-white/5">
                <span className="text-emerald-500">+4 Correct</span>
                <span className="text-red-500">-1 Negative</span>
              </div>
            </div>

            <p className="text-xl leading-relaxed text-zinc-100 font-medium mb-12">
              {q.text}
            </p>

            <div className="space-y-4">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-200 flex items-center gap-6 ${
                    q.selectedAnswer === i 
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-900/10' 
                      : 'border-white/5 bg-zinc-900/50 hover:border-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    q.selectedAnswer === i ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-zinc-300 text-lg">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-80 border-l border-white/5 bg-zinc-950 p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center gap-3 p-4 bg-zinc-900 rounded-2xl border border-white/5">
            <img src="https://ui-avatars.com/api/?name=Aryan+Sharma&background=0D8ABC&color=fff" className="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
            <div>
              <p className="text-sm font-bold">Aryan Sharma</p>
              <p className="text-[10px] text-zinc-500">Aspirant Profile #12</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-full aspect-square text-[10px] font-bold flex items-center justify-center transition-all ${
                  currentIndex === i ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black scale-105 rounded-md' : 'rounded-md'
                } ${STATUS_COLORS[question.status]}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs text-zinc-500">Answered</span>
              <span className="text-xs font-bold text-emerald-400">{answeredCount}</span>
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-xs text-zinc-500">Marked for Review</span>
              <span className="text-xs font-bold text-indigo-400">{questions.filter(q => q.status === QuestionStatus.MARKED_FOR_REVIEW || q.status === QuestionStatus.ANSWERED_AND_MARKED).length}</span>
            </div>
          </div>
        </aside>
      </main>

      <footer className="h-20 border-t border-white/5 px-8 flex items-center justify-between bg-zinc-950">
        <div className="flex gap-4">
          <button onClick={markForReview} className="px-6 py-2.5 rounded-xl border border-indigo-500/30 text-indigo-400 font-bold text-sm hover:bg-indigo-500/10 transition-colors">
            Mark for Review & Next
          </button>
          <button onClick={clearResponse} className="px-6 py-2.5 rounded-xl border border-white/10 text-zinc-400 font-bold text-sm hover:bg-white/5 transition-colors">
            Clear Response
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 font-bold text-sm hover:bg-zinc-800 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button 
            onClick={goToNext}
            className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all"
          >
            Save & Next
          </button>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Submit Test?</h3>
            <p className="text-zinc-400 mb-6">Review your attempt summary before final submission.</p>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between p-4 bg-zinc-950 rounded-2xl border border-white/5">
                <span className="text-zinc-500 text-sm">Attempted Questions</span>
                <span className="font-bold text-emerald-400">{answeredCount} / 90</span>
              </div>
              <div className="flex justify-between p-4 bg-zinc-950 rounded-2xl border border-white/5">
                <span className="text-zinc-500 text-sm">Time Remaining</span>
                <span className="font-bold text-blue-400">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSubmit}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold text-white transition-all shadow-lg shadow-emerald-900/20"
              >
                Confirm Submission
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-bold text-zinc-300 transition-all"
              >
                Back to Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
