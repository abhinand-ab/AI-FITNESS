import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Brain, Dumbbell, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-600">
            <Activity className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">JEEVA AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-12 lg:py-0 w-full max-w-7xl mx-auto gap-12">
          {/* Left Text */}
          <div className="flex-1 lg:max-w-xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
                Your personal AI fitness coach.
              </h1>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Log workouts, analyze performance, and get intelligent recommendations to help you reach your goals faster.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/register" className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-500 transition-colors">
                  Start Training <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 w-full flex justify-end"
          >
            <div className="w-full max-w-lg aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 p-2 overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
              {/* Mock Dashboard UI */}
              <div className="w-full h-full rounded-xl bg-[#0D0D10] border border-white/5 flex flex-col p-4 relative z-10">
                <div className="flex gap-4 h-full">
                  <div className="w-20 h-full border-r border-white/5 flex flex-col gap-3 py-2 pr-4">
                    <div className="h-4 bg-zinc-800 rounded w-full" />
                    <div className="h-4 bg-zinc-800 rounded w-3/4" />
                    <div className="h-4 bg-zinc-800 rounded w-5/6" />
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="flex-1 h-20 bg-indigo-500/20 border border-indigo-500/30 rounded-xl" />
                      <div className="flex-1 h-20 bg-zinc-800/50 rounded-xl" />
                    </div>
                    <div className="flex-1 bg-zinc-800/30 rounded-xl border border-white/5 p-4 flex flex-col">
                      <div className="h-3 bg-zinc-700/50 rounded w-1/3 mb-4" />
                      <div className="flex-1 flex items-end gap-2">
                        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-indigo-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Feature Cards */}
        <section className="px-6 lg:px-12 py-12 border-t border-white/[0.06] bg-[#0c0c0e]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.04]">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                <Dumbbell className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold mb-2">Workout Logging</h3>
              <p className="text-sm text-zinc-400">Track sets, reps, and volume with a clean, distraction-free interface.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.04]">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold mb-2">Progress Analytics</h3>
              <p className="text-sm text-zinc-400">Visualize your strength gains over time with beautiful, automated charts.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.04]">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                <Brain className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold mb-2">AI Assessment</h3>
              <p className="text-sm text-zinc-400">Get daily caloric recommendations and BMI tracking powered by AI.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-white/[0.06] text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} JEEVA AI. Focus on the workout.</p>
      </footer>
    </div>
  );
}