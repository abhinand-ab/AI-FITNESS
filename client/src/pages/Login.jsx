import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../services/authService";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

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
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm z-0" />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[420px] relative z-10 p-8 sm:p-10"
        style={{
          background: "rgba(24,24,27,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
            <Activity style={{ width: 24, height: 24, color: "#fff" }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-sm text-[var(--txt-3)]">Sign in to continue your fitness journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email Input */}
          <div className="inp-wrap">
            <Mail className="inp-icon" style={{ width: 18, height: 18 }} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="inp"
              required
              style={{ paddingLeft: 46, height: 50, borderRadius: 12 }}
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="inp-wrap">
              <Lock className="inp-icon" style={{ width: 18, height: 18 }} />
              <input
                type={showPw ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="inp"
                required
                style={{ paddingLeft: 46, paddingRight: 48, height: 50, borderRadius: 12 }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--txt-3)] hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPw ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button type="button" className="text-xs text-[#6366F1] hover:text-[#7C3AED] transition-colors font-medium">
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold flex items-center justify-center gap-2 mt-4"
            style={{
              background: "linear-gradient(135deg, #6366F1, #7C3AED)",
              height: 50,
              borderRadius: 12,
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
              opacity: loading ? 0.8 : 1,
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)" }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.transform = "translateY(0)" }}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight style={{ width: 18, height: 18 }} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-[var(--txt-3)] mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-white hover:text-[#6366F1] font-semibold transition-colors">
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}