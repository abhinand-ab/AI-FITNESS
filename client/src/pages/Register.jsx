import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../services/authService";
import { Activity, Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-5 bg-[#09090B] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[400px] relative z-10 bg-[#18181B] border border-[#27272A] rounded-2xl p-8 shadow-xl shadow-black/30"
      >
        {/* Header */}
        <div className="text-center mb-7">
          <div className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#4F46E5] to-[#6366F1] shadow-md shadow-indigo-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-sm text-zinc-500">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6366F1] hover:text-[#818CF8] font-semibold transition-colors">Sign in</Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-[#09090B] border border-[#27272A] rounded-lg text-sm text-white py-2.5 pl-10 pr-3 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/30 outline-none transition-all placeholder:text-zinc-600"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#09090B] border border-[#27272A] rounded-lg text-sm text-white py-2.5 pl-10 pr-3 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/30 outline-none transition-all placeholder:text-zinc-600"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type={showPw ? "text" : "password"}
                name="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-[#09090B] border border-[#27272A] rounded-lg text-sm text-white py-2.5 pl-10 pr-10 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/30 outline-none transition-all placeholder:text-zinc-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Toggle password"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength bar */}
            {pwStrength && (
              <div className="mt-2">
                <div className="h-1 rounded-full overflow-hidden bg-white/[0.04]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pwStrength.w}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full"
                    style={{ background: pwStrength.color }}
                  />
                </div>
                <p className="text-[11px] mt-1 font-medium" style={{ color: pwStrength.color }}>{pwStrength.label}</p>
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
                className="text-sm text-red-400 bg-red-500/8 border border-red-500/15 px-3.5 py-2.5 rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terms */}
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            By creating an account you agree to our{" "}
            <span className="text-zinc-400 cursor-pointer hover:text-white transition-colors">Terms of Service</span> and{" "}
            <span className="text-zinc-400 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-semibold text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70"
          >
            {loading ? (
              <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Free Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}