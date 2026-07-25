import { motion } from "framer-motion";
import { Dumbbell, Pencil, Trash2, Calendar, Layers, Repeat, Weight } from "lucide-react";

export default function WorkoutCard({ workout, onEdit, onDelete, index = 0 }) {
    const date = workout.createdAt
        ? new Date(workout.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "Today";

    const volume = (workout.sets || 0) * (workout.reps || 0) * (workout.weight || 0);

    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="wk-card"
        >
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(99,102,241,.1)" }}
                >
                    <Dumbbell style={{ width: 22, height: 22, color: "#818CF8" }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-sm font-semibold text-white truncate">{workout.exercise}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-[var(--txt-3)]"
                            style={{ background: "rgba(255,255,255,.04)", borderRadius: 6, padding: "2px 8px" }}>
                            <Layers style={{ width: 11, height: 11 }} />
                            {workout.sets} sets
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--txt-3)]"
                            style={{ background: "rgba(255,255,255,.04)", borderRadius: 6, padding: "2px 8px" }}>
                            <Repeat style={{ width: 11, height: 11 }} />
                            {workout.reps} reps
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold"
                            style={{ background: "rgba(99,102,241,.12)", borderRadius: 6, padding: "2px 8px", color: "#818CF8" }}>
                            <Weight style={{ width: 11, height: 11 }} />
                            {workout.weight} kg
                        </span>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* Date & volume — desktop */}
                    <div className="hidden sm:flex flex-col items-end mr-2 gap-0.5">
                        <div className="flex items-center gap-1 text-[11px] text-[var(--txt-4)]">
                            <Calendar style={{ width: 10, height: 10 }} />
                            {date}
                        </div>
                        <span className="text-[11px] text-[var(--txt-4)]">
                            vol {volume.toLocaleString()}
                        </span>
                    </div>

                    <button
                        onClick={() => onEdit(workout)}
                        className="btn btn-edit-soft btn-sm"
                        aria-label="Edit"
                    >
                        <Pencil style={{ width: 13, height: 13 }} />
                        <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                        onClick={() => onDelete(workout._id)}
                        className="btn btn-danger-soft btn-sm"
                        aria-label="Delete"
                    >
                        <Trash2 style={{ width: 13, height: 13 }} />
                        <span className="hidden sm:inline">Delete</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
