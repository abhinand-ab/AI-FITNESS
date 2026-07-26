import { motion } from "framer-motion";
import { Dumbbell, Pencil, Trash2, Calendar, Layers, Repeat, Weight } from "lucide-react";

export default function WorkoutCard({ workout, onEdit, onDelete, index = 0 }) {
    const date = workout.createdAt
        ? new Date(workout.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "Today";

    const volume = (workout.sets || 0) * (workout.reps || 0) * (workout.weight || 0);

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group bg-[#09090B] border border-[#27272A]/60 rounded-xl p-3 hover:border-[#3f3f46] hover:bg-[#0f0f12] transition-all duration-200"
        >
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#4F46E5]/8 group-hover:bg-[#4F46E5]/12 transition-colors">
                    <Dumbbell className="w-4.5 h-4.5 text-[#818CF8]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate mb-1">{workout.exercise}</h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 bg-white/[0.03] rounded-md px-2 py-0.5">
                            <Layers className="w-2.5 h-2.5" />
                            {workout.sets} sets
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 bg-white/[0.03] rounded-md px-2 py-0.5">
                            <Repeat className="w-2.5 h-2.5" />
                            {workout.reps} reps
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#818CF8] bg-[#4F46E5]/8 rounded-md px-2 py-0.5">
                            <Weight className="w-2.5 h-2.5" />
                            {workout.weight} kg
                        </span>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* Date & volume — desktop */}
                    <div className="hidden sm:flex flex-col items-end mr-1 gap-0.5">
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                            <Calendar className="w-2.5 h-2.5" />
                            {date}
                        </div>
                        <span className="text-[10px] text-zinc-600">
                            vol {volume.toLocaleString()}
                        </span>
                    </div>

                    <button
                        onClick={() => onEdit(workout)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#818CF8] bg-[#4F46E5]/8 border border-[#4F46E5]/15 rounded-lg px-2.5 py-1.5 hover:bg-[#4F46E5]/15 hover:border-[#4F46E5]/25 transition-all active:scale-95"
                        aria-label="Edit"
                    >
                        <Pencil className="w-3 h-3" />
                        <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                        onClick={() => onDelete(workout._id)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-2.5 py-1.5 hover:bg-red-500/15 hover:border-red-500/25 transition-all active:scale-95"
                        aria-label="Delete"
                    >
                        <Trash2 className="w-3 h-3" />
                        <span className="hidden sm:inline">Delete</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
