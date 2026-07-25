import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "../components/StatCard";
import HeroCard from "../components/HeroCard";
import WorkoutCard from "../components/WorkoutCard";
import EmptyState from "../components/EmptyState";
import ProgressChart from "../components/ProgressChart";
import {
    Dumbbell,
    Activity,
    Flame,
    TrendingUp,
    BarChart3,
    Plus,
} from "lucide-react";

export default function OverviewPanel({
    user, workouts, fitnessResult, totalVolume,
    onEdit, onDelete, onAddWorkout,
}) {
    return (
        <div className="space-y-6">
            {/* Hero */}
            <HeroCard
                user={user}
                workouts={workouts}
                fitnessResult={fitnessResult}
                totalVolume={totalVolume}
            />

            {/* Stat cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    icon={Dumbbell}
                    label="Total Workouts"
                    value={workouts.length}
                    color="indigo"
                    delay={0}
                />
                <StatCard
                    icon={Activity}
                    label="Current BMI"
                    value={fitnessResult ? fitnessResult.bmi : "—"}
                    sub={fitnessResult ? fitnessResult.category : "Run AI Analysis"}
                    color="purple"
                    delay={0.08}
                />
                <StatCard
                    icon={Flame}
                    label="Daily Calories"
                    value={fitnessResult ? fitnessResult.calories : "—"}
                    suffix={fitnessResult ? "kcal" : ""}
                    color="amber"
                    delay={0.16}
                />
                <StatCard
                    icon={TrendingUp}
                    label="Training Volume"
                    value={totalVolume > 0 ? totalVolume.toLocaleString() : "—"}
                    suffix={totalVolume > 0 ? "kg" : ""}
                    color="green"
                    delay={0.24}
                />
            </div>

            {/* Recent workouts + mini-chart side-by-side */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent workouts */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <div className="section-hd mb-0">
                            <div
                                className="section-hd-icon"
                                style={{ background: "rgba(99,102,241,.1)" }}
                            >
                                <Dumbbell style={{ width: 18, height: 18, color: "#818CF8" }} />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white">Recent Workouts</h2>
                                <p className="text-xs text-[var(--txt-3)]">
                                    {workouts.length > 0 ? `${workouts.length} session${workouts.length > 1 ? "s" : ""}` : "No sessions yet"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onAddWorkout}
                            className="btn btn-primary btn-sm"
                            style={{ borderRadius: "var(--radius-xs)" }}
                        >
                            <Plus style={{ width: 14, height: 14 }} />
                            <span>Add</span>
                        </button>
                    </div>

                    {workouts.length > 0 ? (
                        <div className="space-y-3">
                            {workouts.slice(0, 5).map((w, i) => (
                                <WorkoutCard
                                    key={w._id}
                                    workout={w}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    index={i}
                                />
                            ))}
                            {workouts.length > 5 && (
                                <p className="text-xs text-center text-[var(--txt-3)] py-2">
                                    +{workouts.length - 5} more in Workouts tab
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="card">
                            <EmptyState onAdd={onAddWorkout} />
                        </div>
                    )}
                </div>

                {/* Mini chart */}
                <div className="card p-5">
                    <div className="section-hd mb-4">
                        <div className="section-hd-icon" style={{ background: "rgba(59,130,246,.1)" }}>
                            <BarChart3 style={{ width: 16, height: 16, color: "#60A5FA" }} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white">Progress</h3>
                            <p className="text-xs text-[var(--txt-3)]">Weight trend</p>
                        </div>
                    </div>

                    {workouts.length > 1 ? (
                        <ProgressChart workouts={workouts} />
                    ) : (
                        <div
                            className="h-[280px] flex flex-col items-center justify-center text-center"
                        >
                            <BarChart3 style={{ width: 36, height: 36, color: "var(--txt-4)", marginBottom: 12 }} />
                            <p className="text-sm text-[var(--txt-4)]">Log 2+ workouts to see trends</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
