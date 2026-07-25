import { Dumbbell, Plus } from "lucide-react";
import { motion } from "framer-motion";

function EmptyState({ onAdd }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-6"
        >
            {/* Illustration */}
            <div className="relative mb-8">
                <div className="w-28 h-28 rounded-3xl bg-indigo-500/[0.06] flex items-center justify-center animate-float">
                    <Dumbbell className="w-14 h-14 text-indigo-500/40" />
                </div>
                {/* Glowing ring */}
                <div className="absolute inset-0 w-28 h-28 rounded-3xl border-2 border-dashed border-indigo-500/15 animate-[spin_20s_linear_infinite]" />
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-white mb-2">
                Start Your Fitness Journey
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-sm mb-8 leading-relaxed">
                Log your first workout to begin tracking your progress
                and unlock AI-powered fitness insights.
            </p>

            {/* CTA */}
            <button
                onClick={onAdd}
                className="btn-primary !py-3.5 !px-8 !rounded-2xl !text-base"
            >
                <Plus className="w-5 h-5" />
                <span>Add Your First Workout</span>
            </button>
        </motion.div>
    );
}

export default EmptyState;
