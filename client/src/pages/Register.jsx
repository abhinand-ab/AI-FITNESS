import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../services/authService";
import {
  Activity, Mail, Lock, Eye, EyeOff, User, ArrowRight,
  Sparkles, Check, TrendingUp, Brain, Dumbbell,
} from "lucide-react";

const perks = [
  { icon: Sparkles, text: "AI-powered fitness assessment" },
  { icon: TrendingUp, text: "Real-time progress analytics" },
  { icon: Dumbbell, text: "Unlimited workout logging" },
  { icon: Brain, text: "Personalized recommendations" },
];

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await registerUser({ name: form.name, email: form.email, password: form.password });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pwStrength = (() => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Too short", color: "#EF4444", w: 25 };
    if (p.length < 9 && !/[A-Z]/.test(p)) return { label: "Weak", color: "#F59E0B", w: 45 };
    if (p.length >= 9 && /[A-Z]/.test(p) && /[0-9]/.test(p)) return { label: "Strong", color: "#22C55E", w: 100 };
    return { label: "Fair", color: "#6366F1", w: 65 };
  })();

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[55%] auth-left flex-col justify-between p-14 relative">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glow-orb"
            style={{
              width: `${90 + i * 45}px`, height: `${90 + i * 45}px`,
              top: `${[5, 20, 50, 65, 80, 40][i]}%`,
              left: `${[70, 20, 55, 15, 70, 85][i]}%`,
              background: `radial-gradient(circle,rgba(${i % 2 === 0 ? '139,92,246' : '99,102,241'},.14) 0%,transparent 70%)`,
            }}
          />
        ))}

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(10px)" }}>
            <Activity style={{ width: 20, height: 20, color: "#fff" }} />
          </div>
          <span className="text-xl font-bold text-white">
            JEEVA <span className="text-white/30 font-light text-sm">AI</span>
          </span>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-purple-300 text-sm font-semibold mb-4 uppercase tracking-wide">Join the movement</p>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Start training<br />
              <span className="text-transparent" style={{
                backgroundImage: "linear-gradient(135deg,#C084FC,#818CF8)",
                WebkitBackgroundClip: "text", backgroundClip: "text"
              }}>like a champion.</span>
            </h1>
            <p className="text-white/50 text-lg mb-10 max-w-sm leading-relaxed">
              Free forever. No credit card. Set up your profile in under 60 seconds.
            </p>

            <div className="space-y-3">
              {perks.map((p, i) => (
                <motion.div
                  key={p.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,.08)" }}>
                    <Check style={{ width: 14, height: 14, color: "#4ADE80" }} />
                  </div>
                  <span className="text-white/70 text-sm">{p.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <p className="text-white/20 text-xs relative z-10">
          "Don't wish for it. Work for it."
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
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
            <span className="text-lg font-bold g-text">AI Fitness Tracker</span>
          </div>

          <h2 className="text-2xl font-black text-white mb-1">Create account</h2>
          <p className="text-sm text-[var(--txt-3)] mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-[var(--txt-3)] uppercase tracking-wider mb-2 block">Full Name</label>
              <div className="inp-wrap">
                <User className="inp-icon" style={{ width: 17, height: 17 }} />
                <input
                  type="text" name="name" placeholder="Jane Doe"
                  value={form.name} onChange={handleChange}
                  className="inp" required
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold text-[var(--txt-3)] uppercase tracking-wider mb-2 block">Password</label>
              <div className="inp-wrap">
                <Lock className="inp-icon" style={{ width: 17, height: 17 }} />
                <input
                  type={showPw ? "text" : "password"}
                  name="password" placeholder="Min. 8 characters"
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

              {/* Strength bar */}
              {pwStrength && (
                <div className="mt-2">
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pwStrength.w}%` }}
                      transition={{ duration: 0.4 }}
                      style={{ height: "100%", background: pwStrength.color, borderRadius: 4, transition: "background .3s" }}
                    />
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: pwStrength.color }}>{pwStrength.label}</p>
                </div>
              )}
            </div>

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

            {/* Terms */}
            <p className="text-xs text-[var(--txt-4)] leading-relaxed">
              By creating an account you agree to our{" "}
              <span className="text-indigo-400 cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-indigo-400 cursor-pointer">Privacy Policy</span>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-full"
              style={{ padding: "14px 24px", fontSize: 15, borderRadius: "var(--radius-sm)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    style={{ animation: "spin .7s linear infinite" }} />
                  Creating account…
                </span>
              ) : (
                <>
                  <span>Create Free Account</span>
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