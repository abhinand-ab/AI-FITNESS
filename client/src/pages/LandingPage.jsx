import { Link } from "react-router-dom";
import { Activity, Dumbbell, TrendingUp, Brain, ArrowRight } from "lucide-react";
import heroImage from "../assets/hero.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-between font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#27272A]/60 bg-[#09090B]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 lg:px-8 h-14">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#4F46E5] to-[#6366F1] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-shadow">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-white">AI Fitness Tracker</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all">
              Sign In
            </Link>
            <Link to="/register" className="text-sm font-semibold bg-white text-[#09090B] px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors shadow-sm flex items-center gap-1.5">
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-5 lg:px-8 py-10 lg:py-0 gap-10">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] rounded-full px-3 py-1 w-fit mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[11px] font-medium text-zinc-400 tracking-wide">AI-Powered Fitness Platform</span>
            </div>
            <h1 className="text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
              Track. Analyze.{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#a78bfa] bg-clip-text text-transparent">
                Improve.
              </span>
            </h1>
            <p className="text-zinc-400 text-[15px] mb-7 leading-relaxed max-w-md">
              Log your workouts, visualize progress with real-time charts, and receive AI-powered fitness analysis — all in one place.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/register" className="bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 flex items-center gap-2">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="bg-[#18181B] border border-[#27272A] text-zinc-300 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1f1f23] hover:text-white hover:border-[#3f3f46] transition-all">
                Login
              </Link>
            </div>
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-xl bg-[#18181B] border border-[#27272A] p-1.5 overflow-hidden shadow-2xl shadow-black/40">
              {/* Browser mockup bar */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#27272A] bg-[#111114] rounded-t-lg">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]/60" />
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]/60" />
                <span className="w-2 h-2 rounded-full bg-[#22C55E]/60" />
                <div className="flex-1 mx-3">
                  <div className="bg-[#09090B] border border-[#27272A] rounded px-3 py-0.5 max-w-xs mx-auto">
                    <span className="text-[10px] text-zinc-500 font-mono">localhost:5173/dashboard</span>
                  </div>
                </div>
              </div>
              <img
                src={heroImage}
                alt="AI Fitness Tracker Dashboard Preview"
                className="w-full h-auto rounded-b-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Dumbbell,
              title: "Workout Logging",
              desc: "Track exercises, sets, reps, and weight with a clean interface designed for speed.",
              color: "#4F46E5",
            },
            {
              icon: TrendingUp,
              title: "Progress Analytics",
              desc: "Visualize strength gains and volume trends over time with interactive charts.",
              color: "#22C55E",
            },
            {
              icon: Brain,
              title: "AI Fitness Analysis",
              desc: "Get BMI calculation, daily caloric targets, and personalized recommendations.",
              color: "#8B5CF6",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group p-5 rounded-xl bg-[#18181B]/60 border border-[#27272A] hover:border-[#3f3f46] hover:bg-[#18181B] transition-all duration-300 cursor-default"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}15` }}
              >
                <f.icon className="w-4.5 h-4.5" style={{ color: f.color }} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#27272A]/60 py-5">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} AI Fitness Tracker</p>
          <p className="text-xs text-zinc-600">Built for athletes.</p>
        </div>
      </footer>
    </div>
  );
}