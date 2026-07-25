import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Activity, Brain, BarChart3, Dumbbell, Target, Zap,
  ArrowRight, Star, ChevronRight, Shield, Sparkles,
  TrendingUp, Users, Award, Clock, Check,
} from "lucide-react";

/* ── helpers ── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Data ── */
const features = [
  { icon: Brain, c: "indigo", title: "AI Analysis", desc: "Get instant BMI, calorie, and fitness assessments powered by our AI engine." },
  { icon: BarChart3, c: "purple", title: "Smart Analytics", desc: "Beautiful charts showing weight trends, volume, and performance over time." },
  { icon: Dumbbell, c: "blue", title: "Workout Tracking", desc: "Log exercises with sets, reps, and weight. Full CRUD history management." },
  { icon: Target, c: "green", title: "Goal Oriented", desc: "Muscle gain, fat loss, or general fitness — tailored caloric guidance." },
  { icon: TrendingUp, c: "amber", title: "Progress Rings", desc: "Visual progress indicators for sessions, volume, and streaks at a glance." },
  { icon: Shield, c: "red", title: "Secure & Private", desc: "JWT authentication and encrypted localStorage keep your data safe." },
];

const steps = [
  { n: "01", title: "Create Account", desc: "Register in seconds. No credit card required." },
  { n: "02", title: "Log Your Workouts", desc: "Add exercises with sets, reps, and weight. Instant history." },
  { n: "03", title: "Run AI Analysis", desc: "Input body stats. Get BMI, calories, and personalized advice." },
  { n: "04", title: "Track Progress", desc: "Watch your charts grow and personal bests stack up." },
];

const stats = [
  { icon: Users, v: "12K+", l: "Athletes" },
  { icon: Dumbbell, v: "600K+", l: "Workouts Logged" },
  { icon: Award, v: "98%", l: "Satisfaction" },
  { icon: Clock, v: "24/7", l: "AI Available" },
];

const testimonials = [
  {
    name: "Alex Rodriguez", role: "Powerlifter", rating: 5, avatar: "A",
    text: "JEEVA AI completely transformed how I track training. The volume analytics revealed plateaus I never noticed."
  },
  {
    name: "Sarah Chen", role: "Fitness Coach", rating: 5, avatar: "S",
    text: "I recommend this to all my clients. The AI assessment gives them a clear picture instantly."
  },
  {
    name: "Marcus T.", role: "CrossFit Athlete", rating: 5, avatar: "M",
    text: "The progress charts are incredible. Seeing strength gains over time keeps me motivated every single day."
  },
];

const colorMap = {
  indigo: { bg: "rgba(99,102,241,.1)", txt: "#818CF8" },
  purple: { bg: "rgba(139,92,246,.1)", txt: "#A78BFA" },
  blue: { bg: "rgba(59,130,246,.1)", txt: "#60A5FA" },
  green: { bg: "rgba(34,197,94,.1)", txt: "#4ADE80" },
  amber: { bg: "rgba(245,158,11,.1)", txt: "#FCD34D" },
  red: { bg: "rgba(239,68,68,.1)", txt: "#F87171" },
};

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen landing-bg text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(9,9,11,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[68px]">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              <Activity style={{ width: 18, height: 18, color: "#fff" }} />
            </div>
            <span className="text-lg font-bold">
              <span className="g-text">JEEVA</span>
              <span className="text-white/40 font-light text-sm ml-1">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--txt-2)]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login"
              className="btn btn-ghost btn-sm hidden sm:flex">
              Sign In
            </Link>
            <Link to="/register"
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "var(--radius-xs)" }}>
              <span>Get Started</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-[68px] min-h-screen flex items-center landing-grid overflow-hidden">
        {/* Orbs */}
        <div className="glow-orb w-[600px] h-[600px] top-[-10%] left-[-5%]"
          style={{ background: "radial-gradient(circle,rgba(79,70,229,.14) 0%,transparent 70%)" }} />
        <div className="glow-orb w-[400px] h-[400px] bottom-[10%] right-[5%]"
          style={{ background: "radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 relative z-10 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)", color: "#818CF8" }}
            >
              <Sparkles style={{ width: 14, height: 14 }} />
              <span className="text-sm font-semibold">AI-Powered Fitness Intelligence</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.04] tracking-tight mb-6"
            >
              Train Smarter.<br />
              <span className="g-text-white">Level Up Faster.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-[var(--txt-3)] leading-relaxed max-w-xl mb-10"
            >
              Track workouts, analyze performance, and get AI-powered coaching —
              all in one premium platform built for serious athletes.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/register"
                className="btn btn-primary"
                style={{ padding: "15px 32px", fontSize: 16, borderRadius: "var(--radius-lg)" }}>
                <span>Start Free — No Card Needed</span>
                <ArrowRight style={{ width: 18, height: 18 }} />
              </Link>
              <Link to="/login"
                className="btn btn-outline"
                style={{ padding: "15px 28px", fontSize: 16, borderRadius: "var(--radius-lg)" }}>
                Sign In
                <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3 text-sm text-[var(--txt-3)]"
            >
              <div className="flex">
                {["A", "S", "M", "J", "R"].map((l, i) => (
                  <div key={l}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
                      borderColor: "var(--bg)",
                      marginLeft: i > 0 ? -8 : 0,
                      color: "#fff",
                    }}>
                    {l}
                  </div>
                ))}
              </div>
              <span>
                <strong className="text-white">12,000+</strong> athletes already training smarter
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(17,17,20,.5)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeUp key={s.l} delay={i * 0.08} className="text-center">
              <div className="flex justify-center mb-2">
                <s.icon style={{ width: 20, height: 20, color: "#6366F1" }} />
              </div>
              <p className="text-3xl font-black g-text">{s.v}</p>
              <p className="text-sm text-[var(--txt-3)] mt-1">{s.l}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Everything to <span className="g-text">Level Up</span>
            </h2>
            <p className="text-[var(--txt-3)] text-lg">From logging to AI insights — JEEVA has everything serious athletes need.</p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const c = colorMap[f.c] || colorMap.indigo;
              return (
                <FadeUp key={f.title} delay={i * 0.07}>
                  <div className="feat-card h-full">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: c.bg }}>
                      <f.icon style={{ width: 22, height: 22, color: c.txt }} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-[var(--txt-3)] leading-relaxed">{f.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ background: "rgba(17,17,20,.4)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4 block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Up & Running in <span className="g-text">Minutes</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,.3),transparent)" }} />

            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{ background: "linear-gradient(135deg,rgba(79,70,229,.15),rgba(139,92,246,.1))", border: "1px solid rgba(99,102,241,.2)" }}>
                    <span className="text-xl font-black g-text">{s.n}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--txt-3)] leading-relaxed">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4 block">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Loved by <span className="g-text">Real Athletes</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="feat-card !p-7">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} style={{ width: 14, height: 14, color: "#FCD34D", fill: "#FCD34D" }} />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--txt-2)] leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                      style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)", color: "#fff" }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[var(--txt-3)]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] inset-0 m-auto"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 70%)" }} />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to <span className="g-text">Transform?</span>
            </h2>
            <p className="text-[var(--txt-3)] text-lg mb-10 max-w-lg mx-auto">
              Join thousands of athletes training smarter with JEEVA AI. Free to start, forever.
            </p>
            <Link to="/register"
              className="btn btn-primary"
              style={{ padding: "16px 40px", fontSize: 17, borderRadius: "var(--radius-lg)" }}>
              <span>Get Started for Free</span>
              <ArrowRight style={{ width: 20, height: 20 }} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "rgba(17,17,20,.6)" }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              <Activity style={{ width: 16, height: 16, color: "#fff" }} />
            </div>
            <span className="font-bold">
              <span className="g-text">JEEVA</span>
              <span className="text-white/30 font-light text-sm ml-1">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[var(--txt-3)]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-white transition-colors">Get Started</Link>
          </div>

          <p className="text-xs text-[var(--txt-4)]">© {new Date().getFullYear()} JEEVA AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}