import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    Search,
    Menu,
    User,
    Settings,
    LogOut,
    ChevronDown,
    Activity,
} from "lucide-react";

export default function Topbar({ user, activeSection, onLogout, onMenuClick }) {
    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setDropOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const sectionNames = {
        overview: "Overview",
        analytics: "Analytics",
        workouts: "Workouts",
        progress: "Progress",
        "ai-coach": "AI Coach",
        settings: "Settings",
    };

    return (
        <header className="topbar">
            {/* Left: Hamburger (mobile) + breadcrumb */}
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={onMenuClick}
                    className="btn btn-ghost btn-icon lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu style={{ width: 20, height: 20 }} />
                </button>

                <div>
                    <p className="text-xs text-[var(--txt-3)] font-medium uppercase tracking-wider hidden sm:block">
                        Dashboard
                    </p>
                    <h2 className="text-base font-semibold text-white leading-tight">
                        {sectionNames[activeSection] || activeSection}
                    </h2>
                </div>
            </div>

            {/* Right: Notification + profile */}
            <div className="flex items-center gap-2">
                {/* Notification bell */}
                <button
                    className="btn btn-ghost btn-icon relative"
                    aria-label="Notifications"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: "var(--radius-xs)" }}
                >
                    <Bell style={{ width: 17, height: 17 }} />
                    <span className="notif-dot" />
                </button>

                {/* Profile dropdown */}
                <div className="relative" ref={dropRef}>
                    <button
                        onClick={() => setDropOpen(!dropOpen)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
                    >
                        {/* Avatar */}
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm shrink-0"
                            style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
                        >
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-white leading-tight max-w-[110px] truncate">
                                {user?.name || "Athlete"}
                            </p>
                            <p className="text-[11px] text-[var(--txt-3)] leading-tight truncate max-w-[110px]">
                                {user?.email || ""}
                            </p>
                        </div>
                        <ChevronDown
                            style={{ width: 14, height: 14 }}
                            className={`text-[var(--txt-3)] transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    <AnimatePresence>
                        {dropOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                transition={{ duration: 0.18 }}
                                className="dropdown"
                            >
                                <div className="px-3 py-2 mb-1 border-b border-white/[0.06]">
                                    <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                                    <p className="text-[11px] text-[var(--txt-3)] truncate">{user?.email}</p>
                                </div>
                                <button className="dropdown-item">
                                    <User style={{ width: 15, height: 15 }} />
                                    Profile
                                </button>
                                <button className="dropdown-item">
                                    <Settings style={{ width: 15, height: 15 }} />
                                    Settings
                                </button>
                                <div className="my-1 border-t border-white/[0.06]" />
                                <button
                                    className="dropdown-item danger"
                                    onClick={() => { setDropOpen(false); onLogout(); }}
                                >
                                    <LogOut style={{ width: 15, height: 15 }} />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
