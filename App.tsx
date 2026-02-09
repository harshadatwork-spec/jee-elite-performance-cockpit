
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TestInterface } from './components/TestInterface';
import { Analysis } from './components/Analysis';
import { View, TestResult } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  const [lastTestResult, setLastTestResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const handleViewChange = (e: any) => setCurrentView(e.detail);
    window.addEventListener('change-view', handleViewChange);
    return () => window.removeEventListener('change-view', handleViewChange);
  }, []);

  const handleTestFinish = (result: TestResult) => {
    setLastTestResult(result);
    setCurrentView('ANALYSIS');
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-['Inter'] selection:bg-blue-500/30">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 h-screen relative overflow-hidden">
        {currentView === 'DASHBOARD' && <Dashboard />}
        {currentView === 'TEST' && <TestInterface onFinish={handleTestFinish} />}
        {currentView === 'ANALYSIS' && (
          lastTestResult ? (
            <Analysis result={lastTestResult} onRetry={() => setCurrentView('TEST')} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md p-8">
                <div className="w-20 h-20 bg-zinc-900 rounded-3xl mx-auto flex items-center justify-center mb-6 border border-white/5">
                  <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h2 className="text-2xl font-bold">No Recent Analysis</h2>
                <p className="text-zinc-500">Subject-wise performance metrics and heatmaps are generated after test completion. Ready to start?</p>
                <button 
                  onClick={() => setCurrentView('TEST')}
                  className="inline-block px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                >
                  Start Practice Test
                </button>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default App;
