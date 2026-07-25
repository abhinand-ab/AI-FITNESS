import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, suffix = "", color = "indigo", trend, sub, delay = 0 }) {
    const C = {
        indigo: { bg: "rgba(99,102,241,.1)", txt: "#818CF8", cls: "c-indigo" },
        purple: { bg: "rgba(139,92,246,.1)", txt: "#A78BFA", cls: "c-purple" },
        amber: { bg: "rgba(245,158,11,.1)", txt: "#FCD34D", cls: "c-amber" },
        green: { bg: "rgba(34,197,94,.1)", txt: "#4ADE80", cls: "c-green" },
        blue: { bg: "rgba(59,130,246,.1)", txt: "#60A5FA", cls: "c-blue" },
        red: { bg: "rgba(239,68,68,.1)", txt: "#F87171", cls: "c-red" },
    }[color] || { bg: "rgba(99,102,241,.1)", txt: "#818CF8", cls: "c-indigo" };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay }}
            className={`stat-c ${C.cls} group`}
        >
            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
                <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: C.bg }}
                >
                    <Icon style={{ width: 20, height: 20, color: C.txt }} />
                </div>
                {trend && (
                    <span
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: C.bg, color: C.txt }}
                    >
                        {trend}
                    </span>
                )}
            </div>

            {/* Value */}
            <div className="mb-0.5 flex items-end gap-1">
                <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                {suffix && <span className="text-base text-[var(--txt-4)] mb-0.5">{suffix}</span>}
            </div>

            {/* Label */}
            <p className="text-sm text-[var(--txt-3)] font-medium">{label}</p>
            {sub && <p className="text-[11px] text-[var(--txt-4)] mt-0.5">{sub}</p>}
        </motion.div>
    );
}
