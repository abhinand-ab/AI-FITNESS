import { Link, useLocation } from "react-router-dom";
import { Activity, LogOut, Bell, User } from "lucide-react";

function Navbar({ user, onLogout, transparent = false }) {
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent
                    ? "bg-transparent"
                    : "glass-heavy"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            <span className="gradient-text">JEEVA</span>
                            <span className="text-white/60 font-light ml-1">AI</span>
                        </span>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {isDashboard && user ? (
                            <>
                                {/* Notification */}
                                <button className="relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/30 transition-all duration-300">
                                    <Bell className="w-[18px] h-[18px]" />
                                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                </button>

                                {/* User Avatar */}
                                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                                    <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-white font-semibold text-sm">
                                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                    <span className="text-sm font-medium text-white hidden sm:block max-w-[120px] truncate">
                                        {user?.name || "User"}
                                    </span>
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={onLogout}
                                    className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
                                    title="Logout"
                                >
                                    <LogOut className="w-[18px] h-[18px]" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-white font-medium text-sm transition-colors px-4 py-2"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl"
                                >
                                    <span>Get Started</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
