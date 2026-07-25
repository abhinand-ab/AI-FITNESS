import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    LayoutDashboard,
    BarChart3,
    Dumbbell,
    TrendingUp,
    Sparkles,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";

const NAV = [
    { id: "overview", icon: LayoutDashboard, label: "Overview" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "workouts", icon: Dumbbell, label: "Workouts" },
    { id: "progress", icon: TrendingUp, label: "Progress" },
    { id: "ai-coach", icon: Sparkles, label: "AI Coach" },
    { id: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ active, onChange, onLogout, mobileOpen, setMobileOpen }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Mobile backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar panel */}
            <aside
                className={[
                    "sidebar",
                    collapsed ? "collapsed" : "",
                    mobileOpen ? "mobile-open" : "",
                ].join(" ")}
                style={{ width: collapsed ? "72px" : "var(--sidebar-w)" }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-4 h-[68px] border-b border-white/[0.06] shrink-0">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
                    >
                        <Activity className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-lg font-bold tracking-tight overflow-hidden whitespace-nowrap"
                            >
                                <span className="g-text">JEEVA</span>
                                <span className="text-white/40 font-light text-sm ml-1">AI</span>
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {/* Mobile close */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="ml-auto btn btn-ghost btn-icon lg:hidden"
                    >
                        <X style={{ width: 16, height: 16 }} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
                    {NAV.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { onChange(item.id); setMobileOpen(false); }}
                                className={`sidebar-link ${isActive ? "active" : ""}`}
                                title={collapsed ? item.label : ""}
                            >
                                <item.icon style={{ width: 18, height: 18, shrink: 0 }} className="shrink-0" />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="whitespace-nowrap text-sm"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom: Collapse + Logout */}
                <div className="px-2 pb-4 space-y-1 border-t border-white/[0.06] pt-3 shrink-0">
                    <button
                        onClick={() => onLogout()}
                        className="sidebar-link w-full"
                        title={collapsed ? "Logout" : ""}
                    >
                        <LogOut style={{ width: 18, height: 18 }} className="shrink-0 text-red-400" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm text-red-400 whitespace-nowrap"
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Collapse toggle — desktop only */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="sidebar-link hidden lg:flex"
                        title={collapsed ? "Expand" : "Collapse"}
                    >
                        {collapsed ? (
                            <ChevronRight style={{ width: 16, height: 16 }} />
                        ) : (
                            <ChevronLeft style={{ width: 16, height: 16 }} />
                        )}
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm whitespace-nowrap"
                                >
                                    Collapse
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </aside>
        </>
    );
}
