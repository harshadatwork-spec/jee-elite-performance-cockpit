
import React, { useState, useEffect } from 'react';
import { TestResult, QuestionStatus } from '../types';
import { getAIPerformanceInsights } from '../services/geminiService';

interface AnalysisProps {
  result: TestResult;
  onRetry: () => void;
}

export const Analysis: React.FC<AnalysisProps> = ({ result, onRetry }) => {
  const [insights, setInsights] = useState<{title: string, description: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const data = await getAIPerformanceInsights(result);
      setInsights(data.insights);
      setLoading(false);
    };
    fetchInsights();
  }, [result]);

  const subjects = [
    { name: 'Physics', color: 'bg-blue-500', ...result.subjects.Physics },
    { name: 'Chemistry', color: 'bg-emerald-500', ...result.subjects.Chemistry },
    { name: 'Mathematics', color: 'bg-indigo-500', ...result.subjects.Mathematics },
  ];

  return (
    <div className="p-8 lg:p-12 overflow-y-auto h-screen space-y-12 pb-24 scroll-smooth">
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase rounded-full border border-blue-500/20">Official Shift Analysis</span>
            <span className="text-zinc-500 text-xs">#JEE-MAIN-2025-42</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Detailed <span className="text-blue-500">Report Card.</span></h1>
          <p className="text-zinc-500 max-w-md">Your performance has been benchmarked against thousands of successful aspirants.</p>
        </div>
        <button 
          onClick={onRetry}
          className="px-8 py-3 bg-zinc-900 border border-white/5 rounded-2xl font-bold text-zinc-300 hover:bg-zinc-800 transition-all shadow-xl"
        >
          Retake Practice Test
        </button>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2 p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[220px]">
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Score Projection</span>
           <div className="flex items-baseline gap-2">
             <span className="text-7xl font-bold text-white tracking-tighter">{result.totalScore}</span>
             <span className="text-2xl text-zinc-600 font-medium">/ 360</span>
           </div>
           <p className="text-emerald-400 text-sm mt-4 font-semibold flex items-center gap-2">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5V3l2.293 2.293a1 1 0 010 1.414L17 9V7h-5zM4.707 3.293a1 1 0 00-1.414 1.414l2.586 2.586a1 1 0 001.414 0L9.707 4.707a1 1 0 00-1.414-1.414L7 4.586V3a1 1 0 10-2 0v1.586l-.293-.293z" clipRule="evenodd" /></svg>
             Excellent accuracy in Mathematics
           </p>
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        </div>

        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5 flex flex-col justify-center">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Accuracy</span>
          <span className="text-4xl font-bold text-emerald-400">{Math.round(result.accuracy)}%</span>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ width: `${result.accuracy}%` }}></div>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5 flex flex-col justify-center">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Total Time</span>
          <span className="text-4xl font-bold text-blue-400">{Math.floor(result.timeSpent / 60)}m</span>
          <p className="text-xs text-zinc-600 mt-6 uppercase tracking-wider font-bold">Speed: {Math.round(result.timeSpent / Math.max(result.totalScore/4, 1))}s / Q</p>
        </div>
      </section>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <h2 className="text-xl font-bold flex items-center gap-3">
             <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
             Subject Breakdown
           </h2>
           <div className="space-y-6">
             {subjects.map((sub, i) => (
               <div key={i} className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all group">
                 <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-3">
                     <div className={`w-3 h-3 rounded-full ${sub.color}`}></div>
                     <span className="font-bold text-lg">{sub.name}</span>
                   </div>
                   <span className="font-mono font-bold text-zinc-200">{sub.score} / 120</span>
                 </div>
                 <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-6">
                   <div className={`h-full ${sub.color} rounded-full transition-all duration-1000`} style={{ width: `${(sub.score / 120) * 100}%` }}></div>
                 </div>
                 <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col p-2 bg-zinc-950/50 rounded-xl border border-white/5">
                      <span className="text-[9px] text-zinc-600 font-bold uppercase mb-1">Attempted</span>
                      <span className="text-sm font-bold">{sub.attempted}</span>
                    </div>
                    <div className="flex flex-col p-2 bg-zinc-950/50 rounded-xl border border-white/5">
                      <span className="text-[9px] text-zinc-600 font-bold uppercase mb-1">Correct</span>
                      <span className="text-sm font-bold text-emerald-500">{sub.correct}</span>
                    </div>
                    <div className="flex flex-col p-2 bg-zinc-950/50 rounded-xl border border-white/5">
                      <span className="text-[9px] text-zinc-600 font-bold uppercase mb-1">Incorrect</span>
                      <span className="text-sm font-bold text-red-500">{sub.incorrect}</span>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-xl font-bold flex items-center gap-3">
             <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14H11V21L20 10H13Z"/></svg>
             Growth Hack Insights
           </h2>
           <div className="space-y-4">
             {loading ? (
               Array.from({length: 3}).map((_, i) => <div key={i} className="h-32 bg-zinc-900 rounded-[2rem] animate-pulse" />)
             ) : (
               insights.map((insight, i) => (
                 <div key={i} className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 group hover:border-blue-500/20 transition-all relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/50"></div>
                    <h4 className="text-lg font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{insight.title}</h4>
                    <p className="text-zinc-500 leading-relaxed text-sm">{insight.description}</p>
                 </div>
               ))
             )}
           </div>
        </div>
      </div>

      {/* Detailed Question Review */}
      <section className="space-y-10 pt-12 border-t border-white/5">
        <h2 className="text-2xl font-bold flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          Detailed Question Review
        </h2>

        <div className="space-y-6">
          {result.questions.map((q, idx) => {
            const isCorrect = q.selectedAnswer === q.correctAnswer;
            const isAttempted = q.selectedAnswer !== null;

            return (
              <div key={q.id} className="p-8 rounded-[2rem] bg-zinc-950 border border-white/5 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Question {idx + 1}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      q.subject === 'Physics' ? 'bg-blue-600/10 text-blue-400' :
                      q.subject === 'Chemistry' ? 'bg-emerald-600/10 text-emerald-400' :
                      'bg-indigo-600/10 text-indigo-400'
                    }`}>
                      {q.subject}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {isAttempted ? (
                      isCorrect ? (
                        <span className="text-emerald-500 font-bold text-sm flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                          Correct Answer (+4)
                        </span>
                      ) : (
                        <span className="text-red-500 font-bold text-sm flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                          Incorrect Answer (-1)
                        </span>
                      )
                    ) : (
                      <span className="text-zinc-500 font-bold text-sm">Not Attempted (0)</span>
                    )}
                  </div>
                </div>

                <p className="text-zinc-100 text-lg leading-relaxed font-medium">
                  {q.text}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, i) => {
                    const isUserChoice = q.selectedAnswer === i;
                    const isRightAnswer = q.correctAnswer === i;

                    let borderClass = "border-white/5 bg-zinc-900/30";
                    let textClass = "text-zinc-400";
                    let labelClass = "bg-zinc-800 text-zinc-500";

                    if (isRightAnswer) {
                      borderClass = "border-emerald-500/50 bg-emerald-500/10";
                      textClass = "text-emerald-400 font-medium";
                      labelClass = "bg-emerald-500 text-white";
                    } else if (isUserChoice && !isCorrect) {
                      borderClass = "border-red-500/50 bg-red-500/10";
                      textClass = "text-red-400 font-medium";
                      labelClass = "bg-red-500 text-white";
                    }

                    return (
                      <div key={i} className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${borderClass}`}>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] ${labelClass}`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className={`text-sm ${textClass}`}>{opt}</span>
                        {isRightAnswer && (
                          <svg className="w-4 h-4 ml-auto text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        )}
                        {isUserChoice && !isCorrect && (
                          <svg className="w-4 h-4 ml-auto text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/10">
                   <h5 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                     Step-by-Step Solution
                   </h5>
                   <p className="text-zinc-400 text-sm leading-relaxed italic">
                     {q.explanation || "Detailed solution is being processed by the Elite faculty team."}
                   </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
