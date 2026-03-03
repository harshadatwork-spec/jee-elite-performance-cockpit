export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">
          JEE & NEET High-Quality Mock Tests
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Attempt real exam-level mock tests for free.
          Get instant AI-powered analysis.
          No login. No signup. Just practice.
        </p>
        <button className="mt-6 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition">
          Start Free Mock Test
        </button>
      </div>

      {/* Available Tests */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-2">
            JEE Main Full Mock Test #1
          </h2>
          <p className="text-gray-400 mb-4">
            90 Questions • 3 Hours • Real Exam Difficulty
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Attempt Test
          </button>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-2">
            NEET Full Mock Test #1
          </h2>
          <p className="text-gray-400 mb-4">
            180 Questions • 3 Hours • Exam Pattern
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
            Attempt Test
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <h3 className="text-3xl font-semibold mb-6">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-gray-300">
          <div className="bg-zinc-900 p-6 rounded-xl">
            1. Attempt full-length exam pattern test
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl">
            2. Get instant performance breakdown
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl">
            3. Download complete analysis sheet
          </div>
        </div>
      </div>

    </div>
  );
}