import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { motion } from "framer-motion";
import { Activity, User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(formData);

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="hero-glow top-[20%] right-[20%] opacity-30" />
      <div className="hero-glow bottom-[30%] left-[15%] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-sm">
            Start your AI-powered fitness journey today
          </p>
        </div>

        {/* Card */}
        <div className="glass-heavy rounded-3xl p-8 shadow-2xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="premium-input"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="premium-input"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="premium-input !pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-3.5 !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;