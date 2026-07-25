import { Link } from "react-router-dom";
import { Dumbbell, TrendingUp, Brain } from "lucide-react";
import heroImage from "../assets/hero.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-150 flex flex-col justify-between font-sans antialiased selection:bg-zinc-800 selection:text-white">
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-white hover:opacity-90">
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
            </svg>
            <span className="text-sm font-semibold tracking-wider font-mono">JEEVA</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register" className="inline-flex h-8 items-center justify-center rounded-md bg-white px-3 text-xs font-medium text-black hover:bg-zinc-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 flex-1 flex flex-col justify-center py-8 gap-10">

        {/* 2. Hero Section */}
        <section className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 text-[10px] font-mono text-zinc-400 w-fit mb-4">
              <span>AI Fitness Tracker v1.0</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-bold tracking-tight text-white mb-3 leading-tight select-none">
              Your workouts. <br />
              Perfected by AI.
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
              Log athletic training, inspect trends, and get personalized calculations for your metrics. A high-performance tracking system for athletes.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/register" className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors shadow-sm">
                Get Started
              </Link>
              <Link to="/login" className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 px-4 text-xs font-semibold text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors">
                Login
              </Link>
            </div>
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-lg border border-zinc-800/80 bg-zinc-950 p-[1px] overflow-hidden shadow-2xl relative">
              {/* Browser window mockup toolbar */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-zinc-900 bg-zinc-950">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <span className="text-[9px] font-mono text-zinc-650 ml-2">jeeva.ai/dashboard</span>
              </div>
              <img
                src={heroImage}
                alt="AI Fitness Tracker App Dashboard View"
                className="w-full h-auto object-cover opacity-90"
              />
            </div>
          </div>
        </section>

        {/* 3. Features */}
        <section className="border-t border-zinc-900 pt-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950/40 relative">
              <div className="h-8 w-8 mb-3 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-300">
                <Dumbbell className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Workout Tracking</h3>
              <p className="text-xs text-zinc-400 leading-normal">
                Log lifts, reps, sets, and compute volumes without friction. A distraction-free, lightning-fast dashboard.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950/40 relative">
              <div className="h-8 w-8 mb-3 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-300">
                <Brain className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">AI Fitness Analysis</h3>
              <p className="text-xs text-zinc-400 leading-normal">
                Generate calories, targets, and body mass index categories using intelligent fitness evaluation modeling.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950/40 relative">
              <div className="h-8 w-8 mb-3 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-300">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Progress Analytics</h3>
              <p className="text-xs text-zinc-400 leading-normal">
                Inspect volume stats and weight metrics across time. Interactive charts help you review and plan weights.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="w-full border-t border-zinc-900 py-4 text-[10px] text-zinc-500 font-mono">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between sm:px-6">
          <span>© {new Date().getFullYear()} AI Fitness Tracker.</span>
          <span className="text-zinc-600">Built for high performance.</span>
        </div>
      </footer>
    </div>
  );
}