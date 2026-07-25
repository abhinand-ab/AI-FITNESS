import { motion } from "framer-motion";
import ProgressChart from "../ProgressChart";
import { TrendingUp, BarChart3, Award, Calendar } from "lucide-react";

export default function ProgressPanel({ workouts }) {
    const weeks = {};
    workouts.forEach((w) => {
        const d = w.createdAt ? new Date(w.createdAt) : new Date();
        const week = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
        weeks[week] = (weeks[week] || 0) + 1;
    });

    const pb = workouts.reduce((acc, w) => {
        const prev = acc[w.exercise] || 0;
        acc[w.exercise] = Math.max(prev, w.weight);
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-bold text-white mb-1">Progress</h2>
                <p className="text-sm text-[var(--txt-3)]">Track your fitness journey over time</p>
            </motion.div>

            {/* Full chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                <div className="section-hd mb-6">
                    <div className="section-hd-icon" style={{ background: "rgba(59,130,246,.1)" }}>
                        <TrendingUp style={{ width: 18, height: 18, color: "#60A5FA" }} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white">Weight & Volume Trend</h3>
                        <p className="text-xs text-[var(--txt-3)]">Your performance across all logged sessions</p>
                    </div>
                </div>
                {workouts.length > 1
                    ? <ProgressChart workouts={workouts} />
                    : <div className="h-[280px] flex items-center justify-center">
                        <p className="text-sm text-[var(--txt-3)]">Log 2+ workouts to see your trend</p>
                    </div>
                }
            </motion.div>

            {/* Personal bests */}
            {Object.keys(pb).length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                    <div className="section-hd mb-5">
                        <div className="section-hd-icon" style={{ background: "rgba(245,158,11,.1)" }}>
                            <Award style={{ width: 18, height: 18, color: "#FCD34D" }} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white">Personal Bests</h3>
                            <p className="text-xs text-[var(--txt-3)]">Max weight per exercise</p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(pb)
                            .sort(([, a], [, b]) => b - a)
                            .map(([exercise, weight]) => (
                                <div key={exercise} className="flex items-center gap-3 p-3 rounded-xl"
                                    style={{ background: "rgba(245,158,11,.06)", border: "1px solid rgba(245,158,11,.1)" }}>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: "rgba(245,158,11,.12)" }}>
                                        <Award style={{ width: 15, height: 15, color: "#FCD34D" }} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-white truncate">{exercise}</p>
                                        <p className="text-[11px] text-amber-400">{weight} kg</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </motion.div>
            )}

            {workouts.length === 0 && (
                <div className="card p-10 text-center">
                    <TrendingUp style={{ width: 48, height: 48, color: "var(--txt-4)", margin: "0 auto 14px" }} />
                    <p className="text-white font-semibold mb-1">No progress data yet</p>
                    <p className="text-sm text-[var(--txt-3)]">Start logging workouts to track your progress</p>
                </div>
            )}
        </div>
    );
}
