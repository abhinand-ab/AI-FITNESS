import { motion } from "framer-motion";
import ProgressChart from "../ProgressChart";
import StatCard from "../StatCard";
import { BarChart3, TrendingUp, Dumbbell, Weight } from "lucide-react";

export default function AnalyticsPanel({ workouts }) {
    const totalVol = workouts.reduce((s, w) => s + w.sets * w.reps * w.weight, 0);
    const avgWeight = workouts.length > 0
        ? (workouts.reduce((s, w) => s + w.weight, 0) / workouts.length).toFixed(1)
        : 0;
    const maxWeight = workouts.length > 0
        ? Math.max(...workouts.map((w) => w.weight))
        : 0;
    const totalSets = workouts.reduce((s, w) => s + w.sets, 0);

    return (
        <div className="space-y-6">
            {/* Section header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-bold text-white mb-1">Analytics</h2>
                <p className="text-sm text-[var(--txt-3)]">Your performance data at a glance</p>
            </motion.div>

            {/* Stat row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard icon={TrendingUp} label="Total Volume" value={totalVol > 0 ? totalVol.toLocaleString() : "—"} suffix={totalVol > 0 ? "kg" : ""} color="indigo" delay={0} />
                <StatCard icon={Weight} label="Avg Weight" value={avgWeight > 0 ? avgWeight : "—"} suffix={avgWeight > 0 ? "kg" : ""} color="purple" delay={0.08} />
                <StatCard icon={Dumbbell} label="Peak Weight" value={maxWeight > 0 ? maxWeight : "—"} suffix={maxWeight > 0 ? "kg" : ""} color="amber" delay={0.16} />
                <StatCard icon={BarChart3} label="Total Sets" value={totalSets > 0 ? totalSets : "—"} color="green" delay={0.24} />
            </div>

            {/* Full chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
            >
                <div className="section-hd mb-6">
                    <div className="section-hd-icon" style={{ background: "rgba(99,102,241,.1)" }}>
                        <BarChart3 style={{ width: 18, height: 18, color: "#818CF8" }} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white">Progress Analytics</h3>
                        <p className="text-xs text-[var(--txt-3)]">Weight lifted & volume across all sessions</p>
                    </div>
                </div>

                {workouts.length > 1 ? (
                    <ProgressChart workouts={workouts} />
                ) : (
                    <div className="h-[320px] flex flex-col items-center justify-center text-center">
                        <BarChart3 style={{ width: 48, height: 48, color: "var(--txt-4)", marginBottom: 14 }} />
                        <p className="text-base font-semibold text-white mb-2">No data yet</p>
                        <p className="text-sm text-[var(--txt-3)]">Log at least 2 workouts to see your progress chart</p>
                    </div>
                )}
            </motion.div>

            {/* Per-exercise breakdown */}
            {workouts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-6"
                >
                    <h3 className="text-base font-bold text-white mb-4">Exercise Breakdown</h3>
                    <div className="space-y-3">
                        {Array.from(
                            workouts.reduce((acc, w) => {
                                const k = w.exercise;
                                if (!acc.has(k)) acc.set(k, { count: 0, vol: 0, maxW: 0 });
                                const cur = acc.get(k);
                                acc.set(k, {
                                    count: cur.count + 1,
                                    vol: cur.vol + w.sets * w.reps * w.weight,
                                    maxW: Math.max(cur.maxW, w.weight),
                                });
                                return acc;
                            }, new Map())
                        )
                            .sort(([, a], [, b]) => b.vol - a.vol)
                            .map(([name, stats]) => {
                                const maxVol = workouts.reduce((s, w) => s + w.sets * w.reps * w.weight, 1);
                                const pct = Math.min((stats.vol / maxVol) * 100, 100);
                                return (
                                    <div key={name}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-sm font-medium text-white">{name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-[var(--txt-3)]">{stats.count} sessions</span>
                                                <span className="text-xs font-semibold text-indigo-400">
                                                    {stats.vol.toLocaleString()} kg vol
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                style={{
                                                    height: "100%",
                                                    borderRadius: 4,
                                                    background: "linear-gradient(90deg,#4F46E5,#8B5CF6)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
