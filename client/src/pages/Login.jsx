import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../services/authService";
import {
  Activity, Mail, Lock, Eye, EyeOff, ArrowRight,
  Sparkles, Dumbbell, Brain, BarChart3, ChevronRight,
} from "lucide-react";

const features = [
  { icon: Brain, text: "AI-powered fitness analysis" },
  { icon: BarChart3, text: "Advanced progress analytics" },
  { icon: Dumbbell, text: "Smart workout tracking" },
  { icon: Sparkles, text: "Personalized recommendations" },
];

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginUser({ email: form.email, password: form.password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[55%] auth-left flex-col justify-between p-14 relative">
        {/* Background particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glow-orb"
            style={{
              width: `${100 + i * 40}px`, height: `${100 + i * 40}px`,
              top: `${[10, 25, 55, 70, 30, 80][i]}%`,
              left: `${[15, 60, 30, 75, 80, 10][i]}%`,
              background: `radial-gradient(circle,rgba(${i % 2 === 0 ? '99,102,241' : '139,92,246'},.12) 0%,transparent 70%)`,
            }}
          />
        ))}

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(10px)" }}>
            <Activity style={{ width: 20, height: 20, color: "#fff" }} />
          </div>
          <span className="text-xl font-bold text-white">
            JEEVA <span className="text-white/30 font-light text-sm">AI</span>
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-indigo-300 text-sm font-semibold mb-4 tracking-wide uppercase">Welcome back</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Your fitness<br />
              <span className="text-transparent" style={{
                backgroundImage: "linear-gradient(135deg,#818CF8,#C084FC)",
                WebkitBackgroundClip: "text", backgroundClip: "text"
              }}>journey awaits.</span>
            </h1>
            <p className="text-white/50 text-lg mb-10 max-w-sm leading-relaxed">
              Pick up right where you left off. Your data, progress, and AI insights are ready.
            </p>

            <div className="space-y-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,.08)" }}>
                    <f.icon style={{ width: 15, height: 15, color: "#A78BFA" }} />
                  </div>
                  <span className="text-white/70 text-sm">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <p className="text-white/20 text-xs relative z-10">
          "The only bad workout is the one that didn't happen."
        </p>
      </div>

      {/* ── RIGHT PANEL (Form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
              <Activity style={{ width: 16, height: 16, color: "#fff" }} />
            </div>
            <span className="text-lg font-bold g-text">JEEVA AI</span>
          </div>

          <h2 className="text-2xl font-black text-white mb-1">Sign in</h2>
          <p className="text-sm text-[var(--txt-3)] mb-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Create one free
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-[var(--txt-3)] uppercase tracking-wider mb-2 block">Email</label>
              <div className="inp-wrap">
                <Mail className="inp-icon" style={{ width: 17, height: 17 }} />
                <input
                  type="email" name="email" placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                  className="inp" required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[var(--txt-3)] uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="inp-wrap">
                <Lock className="inp-icon" style={{ width: 17, height: 17 }} />
                <input
                  type={showPw ? "text" : "password"}
                  name="password" placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                  className="inp" required
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--txt-3)] hover:text-[var(--txt)] transition-colors"
                  aria-label="Toggle password"
                >
                  {showPw ? <EyeOff style={{ width: 17, height: 17 }} /> : <Eye style={{ width: 17, height: 17 }} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-indigo-500" />
              <span className="text-xs text-[var(--txt-3)]">Remember me for 30 days</span>
            </label>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.18)" }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-full"
              style={{ padding: "14px 24px", fontSize: 15, borderRadius: "var(--radius-sm)", marginTop: 4 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "spin .7s linear infinite" }} />
                  Signing in…
                </span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight style={{ width: 17, height: 17 }} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}