import { useEffect, useState } from "react";
import {
  Activity, BarChart3, Brain, Dumbbell, Flame,
  LogOut, Plus, Ruler, Save, Target, TrendingUp, User, Weight, X, Heart, Zap
} from "lucide-react";

// Services (unchanged)
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../services/workoutService";
import { analyzeFitness } from "../services/fitnessService";

import ProgressChart from "../components/ProgressChart";
import WorkoutCard from "../components/WorkoutCard";

// Helper — compact form field
function FLabel({ icon: Icon, name, label, value, onChange, children, type = "text" }) {
  const isSelect = !!children;
  return (
    <div className="flex-1 min-w-[120px]">
      <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
        <Icon className="w-3 h-3 text-zinc-500" /> {label}
      </label>
      <div className="relative">
        {isSelect ? (
          <select name={name} value={value} onChange={onChange} className="w-full bg-[#09090B] border border-[#27272A] rounded-lg text-xs text-zinc-100 py-2 px-3 appearance-none focus:border-[#4F46E5] outline-none transition-colors">
            {children}
          </select>
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full bg-[#09090B] border border-[#27272A] rounded-lg text-xs text-zinc-100 py-2 px-3 focus:border-[#4F46E5] outline-none transition-colors placeholder:text-zinc-600" />
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

      {/* Sidebar */}
      <aside className="w-16 lg:w-[180px] fixed inset-y-0 left-0 bg-[#0D0D10] border-r border-[#27272A]/50 flex flex-col z-20 transition-all">
        <div className="h-14 flex items-center justify-center lg:justify-start lg:px-4 border-b border-[#27272A]/50">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20">
            <Activity className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="hidden lg:block ml-2.5 text-[13px] font-semibold tracking-tight text-white">AI Fitness</span>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-2 lg:px-3">
          <button className="flex items-center gap-2.5 px-3 py-2 bg-[#4F46E5]/10 text-[#818CF8] rounded-lg w-full text-left">
            <Dumbbell className="w-4 h-4 shrink-0" />
            <span className="hidden lg:block text-xs font-medium">Dashboard</span>
          </button>
        </nav>

        <div className="p-2 lg:p-3 border-t border-[#27272A]/50">
          <button onClick={handleLogout} className="flex items-center gap-2.5 px-3 py-2 text-zinc-500 hover:text-red-400 rounded-lg w-full transition-colors text-left">
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="hidden lg:block text-xs font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-16 lg:ml-[180px] pb-8 transition-all">

        {/* Topbar */}
        <header className="h-14 px-4 lg:px-6 flex items-center justify-between border-b border-[#27272A]/30 bg-[#09090B]/90 backdrop-blur-md z-10 sticky top-0">
          <div>
            <h1 className="text-sm font-semibold text-white">
              Welcome back, <span className="text-[#818CF8]">{user?.name || "Athlete"}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:flex flex-col items-end">
              <p className="text-[10px] text-zinc-500 leading-tight">Total Volume</p>
              <p className="text-xs font-semibold text-white">{totalVolume.toLocaleString()} kg</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-zinc-400" />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-4">

          {/* Workout Form (Top) */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#4F46E5]/10 flex items-center justify-center">
                {editingId ? <Save className="w-3.5 h-3.5 text-[#818CF8]" /> : <Plus className="w-3.5 h-3.5 text-[#818CF8]" />}
              </div>
              <h2 className="text-sm font-semibold text-white">{editingId ? "Edit Workout" : "Log Activity"}</h2>
              {editingId && (
                <button onClick={handleCancelEdit} className="ml-auto flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white bg-white/5 px-2 py-0.5 rounded transition-colors">
                  <X className="w-2.5 h-2.5" /> Cancel
                </button>
              )}
            </div>
            <form onSubmit={handleWorkoutSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
              <FLabel icon={Dumbbell} name="exercise" label="Exercise" value={workoutData.exercise} onChange={handleWorkoutChange} />
              <FLabel icon={Target} name="sets" label="Sets" type="number" value={workoutData.sets} onChange={handleWorkoutChange} />
              <FLabel icon={Activity} name="reps" label="Reps" type="number" value={workoutData.reps} onChange={handleWorkoutChange} />
              <FLabel icon={Weight} name="weight" label="Weight (kg)" type="number" value={workoutData.weight} onChange={handleWorkoutChange} />
              <button type="submit" className="h-[34px] px-5 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] hover:opacity-90 text-white text-xs font-semibold rounded-lg transition-all w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/20 active:scale-[0.97]">
                {editingId ? "Update" : "Save"}
              </button>
            </form>
          </div>

          {/* Middle Row: History + Analytics */}
          <div className="grid lg:grid-cols-2 gap-4 items-start">

            {/* History Column */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-[#22C55E]/10 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
                <h2 className="text-sm font-semibold text-white">History</h2>
                <span className="ml-auto text-[10px] text-zinc-400 bg-[#09090B] px-2 py-0.5 rounded-full border border-[#27272A]">{workouts.length} total</span>
              </div>

              <div className="space-y-2 pr-1 custom-scrollbar">
                {workouts.length > 0 ? workouts.map((w) => (
                  <WorkoutCard key={w._id} workout={w} onEdit={handleEdit} onDelete={handleDelete} />
                )) : (
                  <div className="text-center py-8 bg-[#09090B]/50 rounded-lg border border-dashed border-[#27272A]">
                    <Dumbbell className="w-6 h-6 text-zinc-600 mx-auto mb-1.5" />
                    <p className="text-xs text-zinc-500">No workouts recorded yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Column */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-[#8B5CF6]/10 flex items-center justify-center">
                  <BarChart3 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </div>
                <h2 className="text-sm font-semibold text-white">Analytics</h2>
              </div>

              {workouts.length > 1 ? (
                <ProgressChart workouts={workouts} />
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center bg-[#09090B]/50 rounded-lg border border-dashed border-[#27272A]">
                  <BarChart3 className="w-6 h-6 text-zinc-600 mb-1.5" />
                  <p className="text-xs text-zinc-500">Log at least 2 workouts to view trends.</p>
                </div>
              )}
            </div>

          </div>

          {/* Bottom: Fitness Analysis */}
          <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#4F46E5]/10 flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-[#818CF8]" />
              </div>
              <h2 className="text-sm font-semibold text-white">AI Assessment</h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-4 items-start">
              {/* Input Form */}
              <form onSubmit={handleAnalyze} className="lg:col-span-2 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <FLabel icon={Heart} name="gender" label="Gender" value={fitnessData.gender} onChange={handleFitnessChange}>
                    <option>Male</option><option>Female</option>
                  </FLabel>
                  <FLabel icon={Activity} name="age" label="Age" type="number" value={fitnessData.age} onChange={handleFitnessChange} />
                  <FLabel icon={Ruler} name="height" label="Height (cm)" type="number" value={fitnessData.height} onChange={handleFitnessChange} />
                  <FLabel icon={Weight} name="weight" label="Weight (kg)" type="number" value={fitnessData.weight} onChange={handleFitnessChange} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FLabel icon={Target} name="goal" label="Goal" value={fitnessData.goal} onChange={handleFitnessChange}>
                    <option>Muscle Gain</option><option>Fat Loss</option><option>General Fitness</option>
                  </FLabel>
                  <FLabel icon={Zap} name="activityLevel" label="Activity" value={fitnessData.activityLevel} onChange={handleFitnessChange}>
                    <option>Low</option><option>Moderate</option><option>High</option>
                  </FLabel>
                </div>
                <button type="submit" className="w-full bg-white hover:bg-zinc-100 text-[#09090B] text-xs font-semibold py-2 rounded-lg transition-colors flex justify-center items-center gap-1.5 active:scale-[0.98]">
                  <Brain className="w-3.5 h-3.5" /> Generate Analysis
                </button>
              </form>

              {/* Results */}
              <div className="lg:col-span-3 h-full">
                {fitnessResult ? (
                  <div className="h-full bg-[#4F46E5]/5 border border-[#4F46E5]/15 rounded-xl p-4 flex flex-col justify-center">
                    <div className="flex items-center gap-5 mb-3">
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5 font-medium">BMI Score</p>
                        <p className="text-2xl font-bold text-white leading-tight">{fitnessResult.bmi}</p>
                        <p className="text-xs font-medium text-[#818CF8]">{fitnessResult.category}</p>
                      </div>
                      <div className="w-px h-12 bg-[#27272A]" />
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5 font-medium">Daily Targets</p>
                        <p className="text-2xl font-bold text-white flex items-end gap-1 leading-tight">
                          {fitnessResult.calories} <span className="text-sm font-normal text-zinc-400">kcal</span>
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#27272A]/60">
                      <p className="text-[10px] font-semibold text-[#818CF8] uppercase tracking-wider mb-0.5">Recommendation</p>
                      <p className="text-xs text-zinc-300 leading-relaxed">{fitnessResult.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full py-8 bg-[#09090B]/50 rounded-lg border border-dashed border-[#27272A] flex flex-col items-center justify-center p-4 text-center text-zinc-500 text-xs">
                    <Brain className="w-6 h-6 mb-1.5 opacity-40" />
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