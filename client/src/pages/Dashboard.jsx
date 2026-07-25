import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, BarChart3, Brain, ChevronRight, Dumbbell, Flame,
  LogOut, Plus, Ruler, Save, Target, TrendingUp, User, Weight, X, Heart, Zap
} from "lucide-react";

// Services (unchanged)
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../services/workoutService";
import { analyzeFitness } from "../services/fitnessService";

import ProgressChart from "../components/ProgressChart";
import WorkoutCard from "../components/WorkoutCard";

// Helper components
function FLabel({ icon: Icon, name, label, value, onChange, children, type = "text" }) {
  const isSelect = !!children;
  return (
    <div className="flex-1">
      <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
        <Icon className="w-3.5 h-3.5" /> {label}
      </label>
      <div className="relative">
        {isSelect ? (
          <select name={name} value={value} onChange={onChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 py-2.5 px-3 appearance-none focus:border-indigo-500 outline-none">
            {children}
          </select>
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 py-2.5 px-3 focus:border-indigo-500 outline-none" />
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  // State
  const [workouts, setWorkouts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [workoutData, setWorkoutData] = useState({ exercise: "", sets: "", reps: "", weight: "" });

  const [fitnessData, setFitnessData] = useState({
    age: "", gender: "Male", height: "", weight: "", goal: "Muscle Gain", activityLevel: "Moderate",
  });
  const [fitnessResult, setFitnessResult] = useState(null);

  // Load workouts
  useEffect(() => { loadWorkouts(); }, []);
  const loadWorkouts = async () => {
    try { setWorkouts(await getWorkouts()); }
    catch (e) { console.error(e); }
  };

  // Handlers
  const handleWorkoutChange = (e) => setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  const handleFitnessChange = (e) => setFitnessData({ ...fitnessData, [e.target.name]: e.target.value });

  const handleEdit = (w) => {
    setWorkoutData({ exercise: w.exercise, sets: w.sets, reps: w.reps, weight: w.weight });
    setEditingId(w._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCancelEdit = () => {
    setWorkoutData({ exercise: "", sets: "", reps: "", weight: "" });
    setEditingId(null);
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await updateWorkout(editingId, workoutData);
      else await createWorkout(workoutData);
      setWorkoutData({ exercise: "", sets: "", reps: "", weight: "" });
      setEditingId(null);
      loadWorkouts();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    try { await deleteWorkout(id); loadWorkouts(); }
    catch (e) { console.error(e); }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    try { setFitnessResult(await analyzeFitness({ userId: user.id, ...fitnessData })); }
    catch (e) { console.error(e); }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const totalVolume = workouts.reduce((sum, w) => sum + (w.weight * w.reps * w.sets), 0);

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex font-sans">

      {/* Tiny Sidebar */}
      <aside className="w-16 sm:w-20 lg:w-[220px] fixed inset-y-0 left-0 bg-[#0c0c0e] border-r border-white/[0.04] flex flex-col z-20 transition-all">
        <div className="h-[68px] flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/[0.04]">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <Activity className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="hidden lg:block ml-3 font-semibold tracking-tight">JEEVA</span>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-2 lg:px-4">
          <button className="flex items-center gap-3 px-3 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg w-full">
            <Dumbbell className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block text-sm font-medium">Dashboard</span>
          </button>
        </nav>

        <div className="p-2 lg:p-4 border-t border-white/[0.04]">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-red-400 rounded-lg w-full transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="hidden lg:block text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-16 sm:ml-20 lg:ml-[220px] pb-12 transition-all">

        {/* Topbar */}
        <header className="h-[68px] px-6 lg:px-10 flex items-center justify-between border-b border-white/[0.02] bg-[#09090B]/80 backdrop-blur z-10 sticky top-0">
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">
              Welcome, {user?.name || "Athlete"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-zinc-400 leading-tight">Total Volume</p>
              <p className="text-sm font-semibold">{totalVolume.toLocaleString()} kg</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-zinc-300" />
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6">

          {/* Workout Form (Top) */}
          <div className="bg-[#111114] border border-white/[0.04] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-indigo-500/10 flex items-center justify-center">
                {editingId ? <Save className="w-4 h-4 text-indigo-400" /> : <Plus className="w-4 h-4 text-indigo-400" />}
              </div>
              <h2 className="text-base font-semibold">{editingId ? "Edit Workout" : "Log Action"}</h2>
              {editingId && (
                <button onClick={handleCancelEdit} className="ml-auto flex items-center gap-1 text-xs text-zinc-400 hover:text-white bg-white/5 px-2 py-1 rounded">
                  <X className="w-3 h-3" /> Cancel
                </button>
              )}
            </div>
            <form onSubmit={handleWorkoutSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
              <FLabel icon={Dumbbell} name="exercise" label="Exercise" value={workoutData.exercise} onChange={handleWorkoutChange} />
              <FLabel icon={Target} name="sets" label="Sets" type="number" value={workoutData.sets} onChange={handleWorkoutChange} />
              <FLabel icon={Activity} name="reps" label="Reps" type="number" value={workoutData.reps} onChange={handleWorkoutChange} />
              <FLabel icon={Weight} name="weight" label="Weight" type="number" value={workoutData.weight} onChange={handleWorkoutChange} />
              <button type="submit" className="h-[42px] px-6 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors w-full sm:w-auto shrink-0 flex items-center justify-center gap-2">
                {editingId ? "Update" : "Save"}
              </button>
            </form>
          </div>

          {/* Middle Row: History + Analytics */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">

            {/* History Column */}
            <div className="bg-[#111114] border border-white/[0.04] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded bg-zinc-800 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-zinc-300" />
                </div>
                <h2 className="text-base font-semibold">History</h2>
                <span className="ml-auto text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">{workouts.length} total</span>
              </div>

              <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {workouts.length > 0 ? workouts.map((w) => (
                  <WorkoutCard key={w._id} workout={w} onEdit={handleEdit} onDelete={handleDelete} />
                )) : (
                  <div className="text-center py-10 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
                    <Dumbbell className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                    <p className="text-sm text-zinc-400">No workouts recorded.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Column */}
            <div className="bg-[#111114] border border-white/[0.04] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded bg-zinc-800 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-zinc-300" />
                </div>
                <h2 className="text-base font-semibold">Analytics</h2>
              </div>

              {workouts.length > 1 ? (
                <ProgressChart workouts={workouts} />
              ) : (
                <div className="h-[280px] flex flex-col items-center justify-center text-center bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
                  <BarChart3 className="w-8 h-8 text-zinc-600 mb-2" />
                  <p className="text-sm text-zinc-400">Log at least 2 workouts to view trends.</p>
                </div>
              )}
            </div>

          </div>

          {/* Bottom: Fitness Analysis */}
          <div className="bg-[#111114] border border-white/[0.04] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded bg-indigo-500/10 flex items-center justify-center">
                <Brain className="w-4 h-4 text-indigo-400" />
              </div>
              <h2 className="text-base font-semibold">AI Assessment</h2>
            </div>

            <div className="grid md:grid-cols-5 gap-6 items-start">
              {/* Input Form */}
              <form onSubmit={handleAnalyze} className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FLabel icon={Heart} name="gender" label="Gender" value={fitnessData.gender} onChange={handleFitnessChange}>
                    <option>Male</option><option>Female</option>
                  </FLabel>
                  <FLabel icon={Activity} name="age" label="Age" type="number" value={fitnessData.age} onChange={handleFitnessChange} />
                  <FLabel icon={Ruler} name="height" label="Height (cm)" type="number" value={fitnessData.height} onChange={handleFitnessChange} />
                  <FLabel icon={Weight} name="weight" label="Weight (kg)" type="number" value={fitnessData.weight} onChange={handleFitnessChange} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FLabel icon={Target} name="goal" label="Goal" value={fitnessData.goal} onChange={handleFitnessChange}>
                    <option>Muscle Gain</option><option>Fat Loss</option><option>General Fitness</option>
                  </FLabel>
                  <FLabel icon={Zap} name="activityLevel" label="Activity" value={fitnessData.activityLevel} onChange={handleFitnessChange}>
                    <option>Low</option><option>Moderate</option><option>High</option>
                  </FLabel>
                </div>
                <button type="submit" className="w-full bg-zinc-100 hover:bg-white text-black text-sm font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2">
                  <Brain className="w-4 h-4" /> Generate Analysis
                </button>
              </form>

              {/* Results */}
              <div className="md:col-span-3 h-full">
                {fitnessResult ? (
                  <div className="h-full bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-5 flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-4">
                      <div>
                        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">BMI Score</p>
                        <p className="text-3xl font-bold text-white">{fitnessResult.bmi}</p>
                        <p className="text-sm font-medium text-indigo-400">{fitnessResult.category}</p>
                      </div>
                      <div className="w-px h-16 bg-white/10" />
                      <div>
                        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Daily Targets</p>
                        <p className="text-3xl font-bold text-white flex items-end gap-1">
                          {fitnessResult.calories} <span className="text-base font-normal text-zinc-400 mb-1">kcal</span>
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Recommendation</p>
                      <p className="text-sm text-zinc-300 leading-relaxed">{fitnessResult.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800 flex flex-col items-center justify-center p-6 text-center text-zinc-500 text-sm">
                    <Brain className="w-8 h-8 mb-2 opacity-50" />
                    Enter your body stats and goals<br />to receive AI insights.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Scrollbar overrides just for Dashboard */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272A; border-radius: 4px; }
      `}</style>
    </div>
  );
}