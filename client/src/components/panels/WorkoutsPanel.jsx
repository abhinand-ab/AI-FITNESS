import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkoutCard from "../WorkoutCard";
import EmptyState from "../EmptyState";
import {
    Dumbbell, Plus, Save, X,
    Layers, Repeat, Weight, BarChart3, Timer,
} from "lucide-react";

function FloatInput({ icon: Icon, name, placeholder, value, onChange, type = "text" }) {
    return (
        <div className="fl-wrap">
            <Icon className="inp-icon" style={{ width: 17, height: 17 }} />
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="fl-inp"
            />
            <label className="fl-label">{placeholder}</label>
        </div>
    );
}

export default function WorkoutsPanel({
    workouts, workoutData, editingId,
    onWorkoutChange, onWorkoutSubmit, onEdit, onDelete, onCancelEdit,
    formRef,
}) {
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-bold text-white mb-1">Workouts</h2>
                <p className="text-sm text-[var(--txt-3)]">Log, edit, and manage your training sessions</p>
            </motion.div>

            {/* Form card */}
            <motion.div
                ref={formRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6"
            >
                <div className="flex items-center justify-between mb-5">
                    <div className="section-hd mb-0">
                        <div className="section-hd-icon" style={{ background: "rgba(34,197,94,.1)" }}>
                            {editingId
                                ? <Save style={{ width: 18, height: 18, color: "#4ADE80" }} />
                                : <Plus style={{ width: 18, height: 18, color: "#4ADE80" }} />
                            }
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white">
                                {editingId ? "Edit Workout" : "Log New Workout"}
                            </h3>
                            <p className="text-xs text-[var(--txt-3)]">
                                {editingId ? "Update the selected entry" : "Record your training session"}
                            </p>
                        </div>
                    </div>
                    {editingId && (
                        <button
                            onClick={onCancelEdit}
                            className="btn btn-ghost btn-sm flex items-center gap-2"
                        >
                            <X style={{ width: 14, height: 14 }} />
                            <span>Cancel</span>
                        </button>
                    )}
                </div>

                <form onSubmit={onWorkoutSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <FloatInput icon={Dumbbell} name="exercise" placeholder="Exercise name" value={workoutData.exercise} onChange={onWorkoutChange} />
                        <FloatInput icon={Layers} name="sets" placeholder="Sets" value={workoutData.sets} onChange={onWorkoutChange} type="number" />
                        <FloatInput icon={Repeat} name="reps" placeholder="Reps" value={workoutData.reps} onChange={onWorkoutChange} type="number" />
                        <FloatInput icon={Weight} name="weight" placeholder="Weight (kg)" value={workoutData.weight} onChange={onWorkoutChange} type="number" />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-full ${editingId ? "btn-primary" : "btn-success"}`}
                        style={{ borderRadius: "var(--radius-sm)", padding: "13px 24px" }}
                    >
                        {editingId
                            ? <><Save style={{ width: 17, height: 17 }} /><span>Update Workout</span></>
                            : <><Plus style={{ width: 17, height: 17 }} /><span>Save Workout</span></>
                        }
                    </button>
                </form>
            </motion.div>

            {/* Workout list */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="section-hd mb-0">
                        <div className="section-hd-icon" style={{ background: "rgba(99,102,241,.1)" }}>
                            <Dumbbell style={{ width: 18, height: 18, color: "#818CF8" }} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white">History</h3>
                            <p className="text-xs text-[var(--txt-3)]">
                                {workouts.length > 0 ? `${workouts.length} workout${workouts.length !== 1 ? "s" : ""} logged` : "Empty"}
                            </p>
                        </div>
                    </div>
                </div>

                {workouts.length > 0 ? (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {workouts.map((w, i) => (
                                <WorkoutCard
                                    key={w._id}
                                    workout={w}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    index={i}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="card">
                        <EmptyState onAdd={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} />
                    </div>
                )}
            </motion.div>
        </div>
    );
}
