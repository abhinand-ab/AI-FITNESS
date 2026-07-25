import { Link } from "react-router-dom";
import { Dumbbell, TrendingUp, Brain } from "lucide-react";
import heroImage from "../assets/hero.png";

export default function LandingPage() {
  return (
    <div className="h-screen bg-black text-zinc-250 flex flex-col justify-between font-sans antialiased selection:bg-zinc-800 selection:text-white overflow-hidden">
      {/* 1. Navbar */}
      <nav className="z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md shrink-0">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold text-white hover:opacity-90">
            <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L22 22H2L12 2z" />
            </svg>
            <span className="text-[11px] font-semibold tracking-wider font-mono">AI Fitness Tracker</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-[11px] font-medium text-zinc-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register" className="inline-flex h-7 items-center justify-center rounded bg-white px-3 text-[11px] font-medium text-black hover:bg-zinc-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 flex-1 flex flex-col justify-center py-4 gap-6 overflow-hidden">

        {/* 2. Hero Section */}
        <section className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-900 bg-zinc-950 px-2 py-0.5 text-[9px] font-mono text-zinc-500 w-fit mb-2.5 select-none">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span>v1.0.0 Stable</span>
            </div>
            <h1 className="text-2.5xl sm:text-3.5xl lg:text-[2.2rem] font-extrabold tracking-tighter text-white mb-2 leading-tight select-none">
              Your workouts. <br />
              Perfected by AI.
            </h1>
            <p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed mb-4 max-w-sm">
              Log athletic training, inspect trends, and get personalized calculations for your metrics. A high-performance tracking system for athletes.
            </p>
            <div className="flex items-center gap-2">
              <Link to="/register" className="inline-flex h-8 items-center justify-center rounded bg-white px-3.5 text-[11px] font-semibold text-black hover:bg-zinc-200 transition-colors shadow-sm">
                Get Started
              </Link>
              <Link to="/login" className="inline-flex h-8 items-center justify-center rounded border border-zinc-800 bg-zinc-950 px-3.5 text-[11px] font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors">
                Login
              </Link>
            </div>
          </div>

          {/* Right Preview - Visual Focus */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full rounded-lg border border-zinc-900 bg-zinc-950 p-[1px] overflow-hidden shadow-2xl relative select-none">
              {/* Browser window mockup toolbar */}
              <div className="flex items-center gap-1 px-3 py-1 border-b border-zinc-900 bg-zinc-950">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-805" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-805" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-805" />
                <span className="text-[8px] font-mono text-zinc-650 ml-1.5">localhost:5173/dashboard</span>
              </div>
              <img
                src={heroImage}
                alt="AI Fitness Tracker App Dashboard View"
                className="w-full h-auto object-cover block opacity-100"
              />
            </div>
          </div>
        </section>

        {/* 3. Features - Exactly Three cards */}
        <section className="border-t border-zinc-950 pt-4">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded border border-zinc-900 bg-zinc-950/30 relative hover:border-zinc-850 hover:bg-zinc-950/70 transition-all duration-200">
              <div className="h-6.5 w-6.5 mb-2 flex items-center justify-center rounded border border-zinc-850 bg-zinc-950 text-zinc-400">
                <Dumbbell className="h-3 w-3" />
              </div>
              <h3 className="text-[11px] font-semibold text-white mb-0.5">Workout Tracking</h3>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Log lifts, reps, sets, and compute volumes without friction. A distraction-free, lightning-fast dashboard.
              </p>
            </div>

            <div className="p-3.5 rounded border border-zinc-900 bg-zinc-950/30 relative hover:border-zinc-850 hover:bg-zinc-950/70 transition-all duration-200">
              <div className="h-6.5 w-6.5 mb-2 flex items-center justify-center rounded border border-zinc-850 bg-zinc-950 text-zinc-400">
                <Brain className="h-3 w-3" />
              </div>
              <h3 className="text-[11px] font-semibold text-white mb-0.5">AI Fitness Analysis</h3>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Generate calories, targets, and body mass index categories using intelligent fitness evaluation modeling.
              </p>
            </div>

            <div className="p-3.5 rounded border border-zinc-900 bg-zinc-950/30 relative hover:border-zinc-850 hover:bg-zinc-950/70 transition-all duration-200">
              <div className="h-6.5 w-6.5 mb-2 flex items-center justify-center rounded border border-zinc-850 bg-zinc-950 text-zinc-400">
                <TrendingUp className="h-3 w-3" />
              </div>
              <h3 className="text-[11px] font-semibold text-white mb-0.5">Progress Analytics</h3>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Inspect volume stats and weight metrics across time. Interactive charts help you review and plan weights.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="w-full border-t border-zinc-900 py-2.5 text-[8px] text-zinc-600 font-mono select-none shrink-0">
        <div className="mx-auto max-w-5xl px-4 flex items-center justify-between sm:px-6">
          <span>© {new Date().getFullYear()} AI Fitness Tracker.</span>
          <span>Built for high performance.</span>
        </div>
      </footer>
    </div>
  );
}