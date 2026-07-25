import { Dumbbell, Pencil, Trash2, Calendar } from "lucide-react";
import { motion } from "framer-motion";

function WorkoutCard({ workout, onEdit, onDelete, index = 0 }) {
    const formattedDate = workout.createdAt
        ? new Date(workout.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
        : "Today";

    const volume = (workout.sets || 0) * (workout.reps || 0) * (workout.weight || 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="workout-card group"
        >
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/15 transition-colors">
                    <Dumbbell className="w-6 h-6 text-indigo-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white truncate">
                        {workout.exercise}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-full">
                            {workout.sets} sets
                        </span>
                        <span className="text-xs text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-full">
                            {workout.reps} reps
                        </span>
                        <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                            {workout.weight} kg
                        </span>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* Date */}
                    <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 mr-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                    </div>

                    {/* Volume badge */}
                    <div className="hidden md:block text-right mr-3">
                        <p className="text-xs text-gray-500">Vol</p>
                        <p className="text-sm font-semibold text-white">{volume.toLocaleString()}</p>
                    </div>

                    {/* Actions */}
                    <button
                        onClick={() => onEdit(workout)}
                        className="btn-edit !p-2 !rounded-xl"
                        title="Edit"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(workout._id)}
                        className="btn-danger !p-2 !rounded-xl"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default WorkoutCard;
