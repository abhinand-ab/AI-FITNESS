import { motion } from "framer-motion";

function StatCard({ icon: Icon, label, value, suffix = "", color = "indigo", trend, delay = 0 }) {
    const colorMap = {
        indigo: {
            iconBg: "bg-indigo-500/10",
            iconColor: "text-indigo-400",
            glow: "bg-indigo-500",
            trendColor: "text-indigo-400",
        },
        green: {
            iconBg: "bg-emerald-500/10",
            iconColor: "text-emerald-400",
            glow: "bg-emerald-500",
            trendColor: "text-emerald-400",
        },
        orange: {
            iconBg: "bg-amber-500/10",
            iconColor: "text-amber-400",
            glow: "bg-amber-500",
            trendColor: "text-amber-400",
        },
        purple: {
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-400",
            glow: "bg-purple-500",
            trendColor: "text-purple-400",
        },
        blue: {
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-400",
            glow: "bg-blue-500",
            trendColor: "text-blue-400",
        },
        red: {
            iconBg: "bg-red-500/10",
            iconColor: "text-red-400",
            glow: "bg-red-500",
            trendColor: "text-red-400",
        },
    };

    const colors = colorMap[color] || colorMap.indigo;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="stat-card group"
        >
            {/* Background glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${colors.glow} rounded-full opacity-[0.04] blur-3xl group-hover:opacity-[0.08] transition-opacity duration-500`} />

            <div className="relative z-10">
                {/* Top row: icon + trend */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${colors.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                    </div>
                    {trend && (
                        <span className={`text-xs font-medium ${colors.trendColor} bg-white/[0.04] px-2.5 py-1 rounded-full`}>
                            {trend}
                        </span>
                    )}
                </div>

                {/* Value */}
                <div className="mb-1">
                    <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                        {value}
                    </span>
                    {suffix && (
                        <span className="text-lg text-gray-500 font-medium ml-1">{suffix}</span>
                    )}
                </div>

                {/* Label */}
                <p className="text-sm text-gray-400 font-medium">{label}</p>
            </div>
        </motion.div>
    );
}

export default StatCard;
