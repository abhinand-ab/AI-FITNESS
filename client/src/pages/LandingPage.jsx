import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  BarChart3,
  Dumbbell,
  Target,
  Zap,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  ChevronRight,
  Shield,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Get intelligent fitness assessments, BMI calculations, and personalized recommendations powered by advanced algorithms.",
    color: "indigo",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Visualize your progress with beautiful charts. Track weight, volume, and performance trends over time.",
    color: "purple",
  },
  {
    icon: Dumbbell,
    title: "Workout Tracking",
    description: "Log exercises, sets, reps, and weights with an intuitive interface. Full CRUD operations for your training log.",
    color: "blue",
  },
  {
    icon: Target,
    title: "Goal Oriented",
    description: "Whether it's muscle gain, fat loss, or general fitness — get tailored calorie and nutrition recommendations.",
    color: "green",
  },
  {
    icon: Zap,
    title: "Real-time Insights",
    description: "Instant feedback on your training volume, workout streaks, and performance metrics as you log each session.",
    color: "orange",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with JWT authentication and encrypted storage. Your fitness journey is yours alone.",
    color: "red",
  },
];

const testimonials = [
  {
    name: "Alex Rodriguez",
    role: "Competitive Powerlifter",
    text: "JEEVA AI completely transformed how I track my training. The volume analytics helped me identify plateaus I never noticed before.",
    rating: 5,
    avatar: "A",
  },
  {
    name: "Sarah Chen",
    role: "Fitness Coach",
    text: "I recommend this to all my clients. The AI fitness assessment gives them a clear picture of where they stand and what to improve.",
    rating: 5,
    avatar: "S",
  },
  {
    name: "Marcus Thompson",
    role: "CrossFit Athlete",
    text: "The progress charts are incredible. Being able to see my strength gains over time keeps me motivated every single day.",
    rating: 5,
    avatar: "M",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500K+", label: "Workouts Logged" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "AI Available" },
];

const colorClasses = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  orange: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  red: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
};

function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-white overflow-x-hidden">
      <Navbar />

      {/* =========== HERO =========== */}
      <section className="landing-hero-bg flex items-center relative pt-[72px]">
        <div className="hero-glow top-[10%] left-[10%]" />
        <div className="hero-glow bottom-[10%] right-[15%] opacity-40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 lg:py-40 w-full relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Fitness Intelligence
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              Train Smarter
              <br />
              <span className="gradient-text-hero">With Intelligence</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mb-10"
            >
              Track workouts, analyze performance, and get AI-powered fitness
              recommendations — all in one premium platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/register" className="btn-primary !py-4 !px-8 !text-base !rounded-2xl group">
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="btn-secondary !py-4 !px-8 !text-base !rounded-2xl">
                <span>Sign In</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========== STATS BAR =========== */}
      <section className="border-y border-white/[0.06] bg-card/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== FEATURES =========== */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-4 block">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Level Up</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From workout logging to AI-powered analytics, JEEVA AI gives you the tools
              to achieve your fitness goals faster.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const c = colorClasses[feature.color] || colorClasses.indigo;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="feature-card"
                >
                  <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center mb-5`}>
                    <feature.icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========== TESTIMONIALS =========== */}
      <section className="py-24 md:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-indigo-400 tracking-wider uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Athletes</span>
            </h2>
            <p className="text-gray-400 text-lg">
              See what our community has to say about their experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="feature-card !p-8"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-white font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== CTA =========== */}
      <section className="py-24 md:py-32 relative">
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
              Join thousands of athletes who are already training smarter with JEEVA AI.
            </p>
            <Link to="/register" className="btn-primary !py-4 !px-10 !text-base !rounded-2xl group">
              <span>Get Started — It's Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========== FOOTER =========== */}
      <footer className="border-t border-white/[0.06] bg-card/40 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="gradient-text">JEEVA</span>
                <span className="text-white/50 font-light ml-1">AI</span>
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="hover:text-white transition-colors">Get Started</Link>
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} JEEVA AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;