
import React, { useState, useEffect } from 'react';
import { getAIPerformanceInsights } from '../services/geminiService';

export const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<{title: string, description: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const data = await getAIPerformanceInsights({ accuracy: 82, subjects: { p: 88, c: 74, m: 92 } });
      setInsights(data.insights);
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="p-8 lg:p-12 overflow-y-auto h-screen space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome, <span className="text-blue-500">Student.</span></h1>
          <p className="text-zinc-500 max-w-md">Preparation Day 142. Your test consistency is in the top 2% of all students.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Preparation Streak</span>
              <span className="text-2xl font-bold text-orange-500">🔥 24 Days</span>
           </div>
           <div className="px-6 py-3 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Performance Score</span>
              <span className="text-2xl font-bold text-blue-400">920/1000</span>
           </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14H11V21L20 10H13Z"/></svg>
          </div>
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Physics Mastery</h3>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-bold">88%</span>
            <span className="text-emerald-400 text-sm mb-1 font-medium">+4.2%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[88%] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Chemistry Mastery</h3>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-bold">74%</span>
            <span className="text-red-400 text-sm mb-1 font-medium">-1.8%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-400 w-[74%] rounded-full"></div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Math Mastery</h3>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-bold">92%</span>
            <span className="text-emerald-400 text-sm mb-1 font-medium">+2.1%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 w-[92%] rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14H11V21L20 10H13Z"/></svg>
            AI Preparation Insights
          </h2>
          <div className="space-y-4">
            {loading ? (
              Array.from({length: 3}).map((_, i) => (
                <div key={i} className="h-24 bg-zinc-900 rounded-2xl animate-pulse" />
              ))
            ) : (
              insights.map((insight, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-blue-500/30 transition-all cursor-default group">
                  <h4 className="font-bold text-blue-400 mb-1 group-hover:text-blue-300">{insight.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{insight.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Study Milestones
          </h2>
          <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold border border-blue-500/20">1</div>
                <div>
                  <p className="font-bold">Full Syllabus Mock Test</p>
                  <p className="text-xs text-zinc-500 mt-1">Tomorrow, 09:00 AM • JEE Main Pattern</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold border border-white/5">2</div>
                <div>
                  <p className="font-bold">Organic Chemistry Revision</p>
                  <p className="text-xs text-zinc-500 mt-1">Goal: Complete 50 Practice Questions</p>
                </div>
              </div>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('change-view', { detail: 'TEST' }))}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold shadow-lg shadow-blue-900/20 transition-all"
              >
                Start Mock Test
              </button>
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
