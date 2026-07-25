import { motion } from "framer-motion";
import { Dumbbell, Plus, Zap } from "lucide-react";

export default function EmptyState({ onAdd }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
        >
            {/* Illustration */}
            <div className="relative mb-8">
                <div
                    className="w-28 h-28 rounded-3xl flex items-center justify-center anim-float"
                    style={{ background: "rgba(99,102,241,.08)", border: "1px solid rgba(99,102,241,.12)" }}
                >
                    <Dumbbell style={{ width: 52, height: 52, color: "rgba(99,102,241,.4)" }} />
                </div>
                {/* Orbiting ring */}
                <div
                    className="absolute inset-0 w-28 h-28 rounded-3xl"
                    style={{
                        border: "2px dashed rgba(99,102,241,.12)",
                        animation: "spin 20s linear infinite",
                    }}
                />
                {/* Sparkle */}
                <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
                >
                    <Zap style={{ width: 13, height: 13, color: "#fff" }} />
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Start Your Fitness Journey</h3>
            <p className="text-sm text-[var(--txt-3)] max-w-xs leading-relaxed mb-8">
                Log your first workout to unlock AI-powered analytics,
                progress tracking, and personalized fitness insights.
            </p>

            <button
                onClick={onAdd}
                className="btn btn-primary"
                style={{ borderRadius: "var(--radius-lg)", padding: "14px 32px", fontSize: 15 }}
            >
                <Plus style={{ width: 18, height: 18 }} />
                <span>Add Your First Workout</span>
            </button>
        </motion.div>
    );
}
