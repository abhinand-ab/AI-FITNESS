import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain, Activity, Flame, Heart, Ruler, Weight,
    Target, Zap, Sparkles, CheckCircle, ChevronRight, ChevronLeft,
} from "lucide-react";

/* ── BMI Gauge (semicircle) ── */
function BmiGauge({ bmi }) {
    const val = parseFloat(bmi) || 0;
    const min = 15; const max = 40;
    const pct = Math.min(Math.max((val - min) / (max - min), 0), 1);
    const angleDeg = -180 + pct * 180; // -180 (left) to 0 (right)

    return (
        <div className="gauge-wrap flex flex-col items-center">
            <svg viewBox="0 0 200 110" className="w-48 h-auto">
                <defs>
                    <linearGradient id="gaugeFill" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22C55E" />
                        <stop offset="30%" stopColor="#F59E0B" />
                        <stop offset="60%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>
                {/* Track */}
                <path d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" strokeLinecap="round" />
                {/* Fill */}
                <path d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none" stroke="url(#gaugeFill)" strokeWidth="14" strokeLinecap="round"
                    strokeDasharray={`${pct * 251.3} 251.3`} />
                {/* Needle */}
                <line
                    x1="100" y1="100"
                    x2={100 + 60 * Math.cos((angleDeg * Math.PI) / 180)}
                    y2={100 + 60 * Math.sin((angleDeg * Math.PI) / 180)}
                    stroke="#fff" strokeWidth="2" strokeLinecap="round"
                    style={{ transition: "all .8s cubic-bezier(.4,0,.2,1)" }}
                />
                <circle cx="100" cy="100" r="5" fill="white" />
                {/* Labels */}
                <text x="10" y="115" fill="#71717A" fontSize="9">15</text>
                <text x="100" y="20" fill="#71717A" fontSize="9" textAnchor="middle">27</text>
                <text x="182" y="115" fill="#71717A" fontSize="9">40</text>
            </svg>
            <div className="text-center -mt-2">
                <p className="text-4xl font-bold g-text">{val}</p>
                <p className="text-xs text-[var(--txt-3)] mt-0.5">BMI</p>
            </div>
        </div>
    );
}

/* ── Floating label wrapper ── */
function FLabel({ icon: Icon, name, label, value, onChange, children }) {
    const isSelect = !!children;
    return (
        <div>
            <label className="block text-xs font-semibold text-[var(--txt-3)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Icon style={{ width: 12, height: 12 }} />
                {label}
            </label>
            {isSelect
                ? <div className="inp-wrap">
                    <Icon className="inp-icon" style={{ width: 16, height: 16 }} />
                    <select name={name} value={value} onChange={onChange} className="sel">{children}</select>
                </div>
                : <div className="inp-wrap">
                    <Icon className="inp-icon" style={{ width: 16, height: 16 }} />
                    <input type="number" name={name} placeholder={`Enter ${label.toLowerCase()}`}
                        value={value} onChange={onChange} className="inp" />
                </div>
            }
        </div>
    );
}

const STEPS = ["Body Stats", "Goals", "Results"];

export default function AICoachPanel({ fitnessData, onFitnessChange, onAnalyze, fitnessResult }) {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((s) => Math.min(s + 1, 2));
    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const canProceed0 = fitnessData.age && fitnessData.height && fitnessData.weight;

    const getCatColor = (cat) => {
        if (!cat) return "var(--txt-3)";
        const c = cat.toLowerCase();
        if (c.includes("under")) return "#60A5FA";
        if (c.includes("normal")) return "#4ADE80";
        if (c.includes("over")) return "#FCD34D";
        if (c.includes("obese")) return "#F87171";
        return "#818CF8";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}>
                        <Brain style={{ width: 18, height: 18, color: "#fff" }} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">AI Fitness Coach</h2>
                        <p className="text-xs text-[var(--txt-3)]">Get personalized analysis powered by AI</p>
                    </div>
                </div>
            </motion.div>

            {/* Step indicator */}
            <div className="flex items-center gap-0">
                {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`step-dot ${i < step ? "done" : i === step ? "active" : "pending"}`}>
                                {i < step ? <CheckCircle style={{ width: 14, height: 14 }} /> : i + 1}
                            </div>
                            <span className="text-[10px] font-medium text-[var(--txt-3)] whitespace-nowrap">{s}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className="h-px flex-1 mx-3 mb-4"
                                style={{ background: i < step ? "var(--accent)" : "var(--border)", minWidth: 40, transition: "background .4s" }} />
                        )}
                    </div>
                ))}
            </div>

            {/* Card */}
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div key="step0"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="card p-6">
                        <h3 className="text-base font-bold text-white mb-5">Body Statistics</h3>
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <FLabel icon={Heart} name="gender" label="Gender" value={fitnessData.gender} onChange={onFitnessChange}>
                                <option>Male</option>
                                <option>Female</option>
                            </FLabel>
                            <FLabel icon={Activity} name="age" label="Age (years)" value={fitnessData.age} onChange={onFitnessChange} />
                            <FLabel icon={Ruler} name="height" label="Height (cm)" value={fitnessData.height} onChange={onFitnessChange} />
                            <FLabel icon={Weight} name="weight" label="Weight (kg)" value={fitnessData.weight} onChange={onFitnessChange} />
                        </div>
                        <button
                            className="btn btn-primary btn-full"
                            onClick={nextStep}
                            disabled={!canProceed0}
                            style={{ opacity: canProceed0 ? 1 : 0.45, cursor: canProceed0 ? "pointer" : "not-allowed" }}
                        >
                            <span>Next: Goals</span>
                            <ChevronRight style={{ width: 16, height: 16 }} />
                        </button>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div key="step1"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="card p-6">
                        <h3 className="text-base font-bold text-white mb-5">Your Goals</h3>
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <FLabel icon={Target} name="goal" label="Fitness Goal" value={fitnessData.goal} onChange={onFitnessChange}>
                                <option>Muscle Gain</option>
                                <option>Fat Loss</option>
                                <option>General Fitness</option>
                            </FLabel>
                            <FLabel icon={Zap} name="activityLevel" label="Activity Level" value={fitnessData.activityLevel} onChange={onFitnessChange}>
                                <option>Low</option>
                                <option>Moderate</option>
                                <option>High</option>
                            </FLabel>
                        </div>

                        {/* Goal info cards */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {[
                                { label: "Muscle Gain", icon: "💪", desc: "Build size & strength" },
                                { label: "Fat Loss", icon: "🔥", desc: "Burn fat & get lean" },
                                { label: "General Fitness", icon: "🏃", desc: "Balanced health" },
                            ].map((g) => (
                                <button
                                    key={g.label}
                                    onClick={() => onFitnessChange({ target: { name: "goal", value: g.label } })}
                                    className={`p-3 rounded-xl border text-left transition-all ${fitnessData.goal === g.label
                                            ? "border-indigo-500/40 bg-indigo-500/10"
                                            : "border-white/[0.06] bg-white/[0.02]"
                                        }`}
                                >
                                    <div className="text-xl mb-1">{g.icon}</div>
                                    <p className="text-[11px] font-semibold text-white">{g.label}</p>
                                    <p className="text-[10px] text-[var(--txt-3)]">{g.desc}</p>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button className="btn btn-outline btn-full" onClick={prevStep}>
                                <ChevronLeft style={{ width: 16, height: 16 }} />
                                <span>Back</span>
                            </button>
                            <button
                                className="btn btn-primary btn-full"
                                onClick={async (e) => { await onAnalyze(e); setStep(2); }}
                            >
                                <Sparkles style={{ width: 16, height: 16 }} />
                                <span>Analyze with AI</span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2"
                        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4">
                        {fitnessResult ? (
                            <>
                                {/* Top results */}
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {/* BMI gauge */}
                                    <div className="card p-5 flex flex-col items-center sm:col-span-1">
                                        <p className="text-xs font-semibold text-[var(--txt-3)] uppercase tracking-wider mb-3">BMI Score</p>
                                        <BmiGauge bmi={fitnessResult.bmi} />
                                        <p className="text-sm font-semibold mt-2" style={{ color: getCatColor(fitnessResult.category) }}>
                                            {fitnessResult.category}
                                        </p>
                                    </div>

                                    {/* Calories card */}
                                    <div className="card p-5 sm:col-span-2 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                                    style={{ background: "rgba(245,158,11,.1)" }}>
                                                    <Flame style={{ width: 18, height: 18, color: "#FCD34D" }} />
                                                </div>
                                                <p className="text-sm font-semibold text-white">Daily Calories</p>
                                            </div>
                                            <p className="text-5xl font-bold text-white mb-1">
                                                {fitnessResult.calories}
                                                <span className="text-xl text-[var(--txt-3)] ml-2">kcal</span>
                                            </p>
                                            <p className="text-xs text-[var(--txt-3)]">Recommended daily intake for your goal</p>
                                        </div>

                                        <div className="mt-4 grid grid-cols-3 gap-3">
                                            {[
                                                { l: "Goal", v: fitnessData.goal },
                                                { l: "Activity", v: fitnessData.activityLevel },
                                                { l: "Gender", v: fitnessData.gender },
                                            ].map(({ l, v }) => (
                                                <div key={l} className="rounded-xl p-2.5 text-center"
                                                    style={{ background: "rgba(255,255,255,.03)", border: "1px solid var(--border)" }}>
                                                    <p className="text-[10px] text-[var(--txt-3)] uppercase tracking-wider">{l}</p>
                                                    <p className="text-xs font-semibold text-white mt-1">{v}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendation */}
                                <div className="card p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles style={{ width: 16, height: 16, color: "#818CF8" }} />
                                        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">AI Recommendation</p>
                                    </div>
                                    <p className="text-sm text-[var(--txt-2)] leading-relaxed">{fitnessResult.recommendation}</p>
                                </div>

                                <button className="btn btn-outline btn-sm" onClick={() => setStep(0)}>
                                    ← Recalculate
                                </button>
                            </>
                        ) : (
                            <div className="card p-10 text-center">
                                <Brain style={{ width: 48, height: 48, color: "var(--txt-4)", margin: "0 auto 16px" }} />
                                <p className="text-white font-semibold mb-1">No analysis yet</p>
                                <p className="text-sm text-[var(--txt-3)] mb-4">Complete the previous steps to get your AI assessment</p>
                                <button className="btn btn-primary btn-sm" onClick={() => setStep(0)}>Start Analysis</button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
