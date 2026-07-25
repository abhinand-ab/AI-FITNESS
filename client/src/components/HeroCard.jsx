import { motion } from "framer-motion";
import { Flame, Dumbbell, Activity, TrendingUp, Zap } from "lucide-react";

const QUOTES = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. Push your mind.",
    "Success starts with self-discipline.",
    "Don't wish for it. Work for it.",
    "Strength doesn't come from what you can do. It comes from overcoming what you couldn't.",
];

function ProgressRing({ value = 0, max = 100, size = 80, stroke = 7, color = "#6366F1" }) {
    const pct = Math.min(value / max, 1);
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct);

    return (
        <svg width={size} height={size} className="ring-svg">
            <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
            </defs>
            <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
            <circle
                className="ring-fill"
                cx={size / 2}
                cy={size / 2}
                r={r}
                strokeWidth={stroke}
                strokeDasharray={circ}
                strokeDashoffset={offset}
            />
        </svg>
    );
}

export default function HeroCard({ user, workouts, fitnessResult, totalVolume }) {
    const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
    const streakCount = Math.min(workouts.length, 30);
    const volumePct = Math.min((totalVolume / 5000) * 100, 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="hero-card p-6 md:p-8 mb-6"
        >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-indigo-400 font-medium">{greeting} 👋</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {user?.name || "Athlete"}
                    </h1>
                    <p className="text-sm text-[var(--txt-3)] italic max-w-sm leading-relaxed">
                        "{quote}"
                    </p>

                    {/* Quick mini-stats row */}
                    <div className="flex flex-wrap gap-3 mt-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                            style={{ background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.15)" }}>
                            <Dumbbell style={{ width: 14, height: 14, color: "#818CF8" }} />
                            <span className="text-xs font-semibold text-indigo-300">{workouts.length} Workouts</span>
                        </div>
                        {fitnessResult && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                                style={{ background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.15)" }}>
                                <Flame style={{ width: 14, height: 14, color: "#FCD34D" }} />
                                <span className="text-xs font-semibold text-amber-300">{fitnessResult.calories} kcal</span>
                            </div>
                        )}
                        {fitnessResult && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                                style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.15)" }}>
                                <Activity style={{ width: 14, height: 14, color: "#4ADE80" }} />
                                <span className="text-xs font-semibold text-green-400">BMI {fitnessResult.bmi}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right — progress ring */}
                <div className="flex items-center gap-5 shrink-0">
                    <div className="text-center">
                        <div className="relative inline-block">
                            <ProgressRing value={streakCount} max={30} size={90} stroke={7} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-white">{streakCount}</span>
                                <span className="text-[10px] text-[var(--txt-3)] leading-tight">sessions</span>
                            </div>
                        </div>
                        <p className="text-xs text-[var(--txt-3)] mt-1 font-medium">Activity</p>
                    </div>

                    {totalVolume > 0 && (
                        <div className="text-center">
                            <div className="relative inline-block">
                                <ProgressRing value={volumePct} max={100} size={90} stroke={7} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-[13px] font-bold text-white leading-tight">
                                        {totalVolume > 999 ? `${(totalVolume / 1000).toFixed(1)}k` : totalVolume}
                                    </span>
                                    <span className="text-[10px] text-[var(--txt-3)]">kg</span>
                                </div>
                            </div>
                            <p className="text-xs text-[var(--txt-3)] mt-1 font-medium">Volume</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
