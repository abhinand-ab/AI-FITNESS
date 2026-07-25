import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BrainCircuit, LineChart, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-fitness-bg text-fitness-textMain flex flex-col justify-between selection:bg-fitness-accent selection:text-black">

      {/* 1. Navbar */}
      <nav className="border-b border-fitness-border/60 bg-fitness-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-fitness-accent/20 border border-fitness-accent/40 flex items-center justify-center text-fitness-accent">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">Pulse<span className="text-fitness-accent">Fit</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-fitness-textMuted hover:text-white transition-colors">
              Log In
            </Link>
            <Link to="/register" className="text-sm font-medium px-4 py-2 rounded-lg bg-fitness-accent hover:bg-emerald-400 text-black font-semibold transition-all shadow-lg shadow-fitness-accentGlow">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fitness-accent/10 border border-fitness-accent/30 text-fitness-accent text-xs font-semibold uppercase tracking-wider">
            <span>AI-Powered Performance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Track every rep. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Optimize every set.
            </span>
          </h1>
          <p className="text-fitness-textMuted text-base leading-relaxed">
            A precise, distraction-free workout logger paired with real-time biometric analysis to hit your body composition goals faster.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link to="/register" className="px-6 py-3 rounded-xl bg-fitness-accent hover:bg-emerald-400 text-black font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-fitness-accentGlow">
              Start Free Trial <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="px-6 py-3 rounded-xl bg-fitness-card hover:bg-fitness-cardHover border border-fitness-border text-sm font-semibold text-white transition-all">
              Sign In
            </Link>
          </div>
        </div>

        {/* Dashboard Product Preview */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-fitness-border bg-fitness-card/80 p-2 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-fitness-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-fitness-textMuted font-mono ml-2">app.pulsefit.io/dashboard</span>
            </div>
            <div className="p-4 bg-fitness-bg rounded-b-xl space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-fitness-card border border-fitness-border rounded-lg">
                  <p className="text-[10px] text-fitness-textMuted uppercase font-bold">Volume</p>
                  <p className="text-lg font-extrabold text-white">18,420 kg</p>
                </div>
                <div className="p-3 bg-fitness-card border border-fitness-border rounded-lg">
                  <p className="text-[10px] text-fitness-textMuted uppercase font-bold">Workouts</p>
                  <p className="text-lg font-extrabold text-fitness-accent">14 / mo</p>
                </div>
                <div className="p-3 bg-fitness-card border border-fitness-border rounded-lg">
                  <p className="text-[10px] text-fitness-textMuted uppercase font-bold">Recovery</p>
                  <p className="text-lg font-extrabold text-teal-400">92%</p>
                </div>
              </div>
              <div className="h-32 bg-fitness-card border border-fitness-border rounded-lg flex items-end justify-between p-3 gap-2">
                {[40, 65, 30, 85, 95, 75, 60].map((h, i) => (
                  <div key={i} className="w-full bg-fitness-accent/20 hover:bg-fitness-accent rounded-t transition-all" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Exactly Three Feature Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-fitness-card border border-fitness-border hover:border-fitness-accent/40 transition-all">
            <Activity className="w-8 h-8 text-fitness-accent mb-4" />
            <h3 className="font-bold text-lg mb-1">Workout Tracking</h3>
            <p className="text-sm text-fitness-textMuted leading-relaxed">Log sets, reps, and weights with sub-second speed designed for training session focus.</p>
          </div>
          <div className="p-6 rounded-2xl bg-fitness-card border border-fitness-border hover:border-fitness-accent/40 transition-all">
            <BrainCircuit className="w-8 h-8 text-fitness-accent mb-4" />
            <h3 className="font-bold text-lg mb-1">AI Fitness Analysis</h3>
            <p className="text-sm text-fitness-textMuted leading-relaxed">Get automated insights on progressive overload, fatigue levels, and plateaus.</p>
          </div>
          <div className="p-6 rounded-2xl bg-fitness-card border border-fitness-border hover:border-fitness-accent/40 transition-all">
            <LineChart className="w-8 h-8 text-fitness-accent mb-4" />
            <h3 className="font-bold text-lg mb-1">Progress Analytics</h3>
            <p className="text-sm text-fitness-textMuted leading-relaxed">Visualize strength curves, volume density, and body composition changes effortlessly.</p>
          </div>
        </div>
      </section>

      {/* 4. Minimal Footer */}
      <footer className="border-t border-fitness-border/40 py-6 text-center text-xs text-fitness-textMuted">
        <p>© {new Date().getFullYear()} PulseFit Inc. Designed for performance.</p>
      </footer>
    </div>
  );
}