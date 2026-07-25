import { Link } from "react-router-dom";
import { Activity, Dumbbell, TrendingUp, Brain } from "lucide-react";
import heroImage from "../assets/hero.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-white/[0.06]">
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
      <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 py-6 gap-6">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2 block">
              JEEVA AI
            </span>
            <h1 className="text-3xl lg:text-4.5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Your personal AI fitness coach.
            </h1>
            <p className="text-zinc-400 text-sm lg:text-base mb-6 leading-relaxed">
              Log workouts, analyze performance, and get intelligent recommendations to help you reach your goals faster.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/register" className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-500 transition-colors">
                Get Started
              </Link>
              <Link to="/login" className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors">
                Login
              </Link>
            </div>
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-1.5 overflow-hidden shadow-xl">
              <img
                src={heroImage}
                alt="JEEVA AI Dashboard View"
                className="w-full h-auto rounded-lg object-cover border border-white/5"
              />
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-4 mt-2">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/[0.04] flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Dumbbell className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Workout Logging</h3>
              <p className="text-xs text-zinc-400">Track sets, reps, and volume with a clean, distraction-free interface.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/[0.04] flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Progress Analytics</h3>
              <p className="text-xs text-zinc-400">Visualize your strength gains over time with beautiful, automated charts.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/[0.04] flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Brain className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">AI Assessment</h3>
              <p className="text-xs text-zinc-400">Get daily caloric recommendations and BMI tracking powered by AI.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center border-t border-white/[0.06] text-[10px] text-zinc-500">
        <p>© {new Date().getFullYear()} JEEVA AI. Focus on the workout.</p>
      </footer>
    </div>
  );
}