import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressChart from "../components/ProgressChart";
import StatCard from "../components/StatCard";
import WorkoutCard from "../components/WorkoutCard";
import EmptyState from "../components/EmptyState";
import Navbar from "../components/Navbar";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../services/workoutService";
import { analyzeFitness } from "../services/fitnessService";
import {
  Dumbbell,
  Activity,
  Flame,
  TrendingUp,
  Sparkles,
  UserCircle,
  Ruler,
  Weight,
  Target,
  Zap,
  BarChart3,
  Plus,
  Save,
  X,
  ClipboardList,
  Brain,
  Heart,
  ChevronDown,
  Timer,
} from "lucide-react";

const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Success starts with self-discipline.",
  "Don't wish for it. Work for it.",
  "The pain you feel today will be the strength you feel tomorrow.",
];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [workouts, setWorkouts] = useState([]);
  const [fitnessResult, setFitnessResult] = useState(null);
  const [fitnessData, setFitnessData] = useState({
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    goal: "Muscle Gain",
    activityLevel: "Moderate",
  });
  const [workoutData, setWorkoutData] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
  });

  const [editingId, setEditingId] = useState(null);
  const workoutFormRef = useRef(null);

  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFitnessChange = (e) => {
    setFitnessData({
      ...fitnessData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkoutChange = (e) => {
    setWorkoutData({
      ...workoutData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (workout) => {
    setWorkoutData({
      exercise: workout.exercise || "",
      sets: workout.sets || "",
      reps: workout.reps || "",
      weight: workout.weight || "",
    });

    setEditingId(workout._id);
    workoutFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    try {
      const result = await analyzeFitness({
        userId: user.id,
        ...fitnessData,
      });

      setFitnessResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  const totalVolume = workouts.reduce(
    (sum, workout) => sum + workout.weight * workout.reps * workout.sets,
    0
  );

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateWorkout(editingId, workoutData);
      } else {
        await createWorkout(workoutData);
      }

      setWorkoutData({
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
      });
      setEditingId(null);
      loadWorkouts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);
      loadWorkouts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const scrollToWorkoutForm = () => {
    workoutFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="pt-[72px]">
        {/* =========== HERO SECTION =========== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent" />
          <div className="hero-glow top-0 left-[20%] opacity-20" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-14 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-400 text-sm font-medium mb-1">
                  {greeting} 👋
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {user?.name || "Athlete"}
                </h1>
                <p className="text-gray-500 text-sm max-w-md italic">
                  "{quote}"
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <button
                  onClick={scrollToWorkoutForm}
                  className="btn-primary !py-3 !px-6 !rounded-2xl"
                >
                  <Plus className="w-5 h-5" />
                  <span>Log Workout</span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========== STATS GRID =========== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              icon={Dumbbell}
              label="Total Workouts"
              value={workouts.length}
              color="indigo"
              trend={workouts.length > 0 ? `${workouts.length} logged` : null}
              delay={0}
            />
            <StatCard
              icon={Activity}
              label="Current BMI"
              value={fitnessResult ? fitnessResult.bmi : "--"}
              color="purple"
              trend={fitnessResult?.category || null}
              delay={0.1}
            />
            <StatCard
              icon={Flame}
              label="Daily Calories"
              value={fitnessResult ? fitnessResult.calories : "--"}
              suffix={fitnessResult ? "kcal" : ""}
              color="orange"
              delay={0.2}
            />
            <StatCard
              icon={TrendingUp}
              label="Training Volume"
              value={totalVolume > 0 ? totalVolume.toLocaleString() : "--"}
              suffix={totalVolume > 0 ? "kg" : ""}
              color="green"
              delay={0.3}
            />
          </div>
        </section>

        {/* =========== FITNESS ASSESSMENT =========== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="premium-card overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-0 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">AI Fitness Assessment</h2>
                <p className="text-xs text-gray-500">Get personalized insights powered by AI</p>
              </div>
            </div>

            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <form
                onSubmit={handleAnalyze}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {/* Age */}
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={fitnessData.age}
                    onChange={handleFitnessChange}
                    className="premium-input"
                  />
                </div>

                {/* Height */}
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <input
                    name="height"
                    type="number"
                    placeholder="Height (cm)"
                    value={fitnessData.height}
                    onChange={handleFitnessChange}
                    className="premium-input"
                  />
                </div>

                {/* Weight */}
                <div className="relative">
                  <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <input
                    name="weight"
                    type="number"
                    placeholder="Weight (kg)"
                    value={fitnessData.weight}
                    onChange={handleFitnessChange}
                    className="premium-input"
                  />
                </div>

                {/* Gender */}
                <div className="relative">
                  <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <select
                    name="gender"
                    value={fitnessData.gender}
                    onChange={handleFitnessChange}
                    className="premium-select"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                {/* Goal */}
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <select
                    name="goal"
                    value={fitnessData.goal}
                    onChange={handleFitnessChange}
                    className="premium-select"
                  >
                    <option>Muscle Gain</option>
                    <option>Fat Loss</option>
                    <option>General Fitness</option>
                  </select>
                </div>

                {/* Activity Level */}
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <select
                    name="activityLevel"
                    value={fitnessData.activityLevel}
                    onChange={handleFitnessChange}
                    className="premium-select"
                  >
                    <option>Low</option>
                    <option>Moderate</option>
                    <option>High</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-primary !rounded-xl lg:col-span-3"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze with AI</span>
                </button>
              </form>

              {/* Fitness Results */}
              <AnimatePresence>
                {fitnessResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      {/* BMI Card */}
                      <div className="glass rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-5 h-5 text-indigo-400" />
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">BMI</p>
                        <p className="text-3xl font-bold gradient-text">{fitnessResult.bmi}</p>
                      </div>

                      {/* Category Card */}
                      <div className="glass rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                          <Heart className="w-5 h-5 text-emerald-400" />
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Category</p>
                        <p className="text-xl font-bold text-white">{fitnessResult.category}</p>
                      </div>

                      {/* Calories Card */}
                      <div className="glass rounded-2xl p-5 text-center">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                          <Flame className="w-5 h-5 text-amber-400" />
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Daily Calories</p>
                        <p className="text-3xl font-bold text-white">
                          {fitnessResult.calories}
                          <span className="text-sm text-gray-500 ml-1">kcal</span>
                        </p>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="glass rounded-2xl p-5 mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                          AI Recommendation
                        </p>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {fitnessResult.recommendation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* =========== WORKOUT FORM =========== */}
        <section ref={workoutFormRef} className="max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="premium-card overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-0 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {editingId ? "Update Workout" : "Log Workout"}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {editingId ? "Editing existing entry" : "Record your training session"}
                  </p>
                </div>
              </div>

              {editingId && (
                <button
                  onClick={() => {
                    setWorkoutData({
                      exercise: "",
                      sets: "",
                      reps: "",
                      weight: "",
                    });
                    setEditingId(null);
                  }}
                  className="btn-danger !px-4 !py-2 !text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              )}
            </div>

            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <form onSubmit={handleWorkoutSubmit} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Exercise */}
                <div className="relative">
                  <Dumbbell className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <input
                    name="exercise"
                    placeholder="Exercise name"
                    value={workoutData.exercise}
                    onChange={handleWorkoutChange}
                    className="premium-input"
                    required
                  />
                </div>

                {/* Sets */}
                <div className="relative">
                  <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <input
                    name="sets"
                    type="number"
                    placeholder="Sets"
                    value={workoutData.sets}
                    onChange={handleWorkoutChange}
                    className="premium-input"
                    required
                  />
                </div>

                {/* Reps */}
                <div className="relative">
                  <Timer className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <input
                    name="reps"
                    type="number"
                    placeholder="Reps"
                    value={workoutData.reps}
                    onChange={handleWorkoutChange}
                    className="premium-input"
                    required
                  />
                </div>

                {/* Weight */}
                <div className="relative">
                  <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 z-10" />
                  <input
                    name="weight"
                    type="number"
                    placeholder="Weight (kg)"
                    value={workoutData.weight}
                    onChange={handleWorkoutChange}
                    className="premium-input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`${editingId ? "btn-primary" : "btn-success"} !rounded-xl lg:col-span-4`}
                >
                  {editingId ? (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Update Workout</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Save Workout</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* =========== ANALYTICS =========== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="premium-card overflow-hidden"
          >
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-0 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Progress Analytics</h2>
                <p className="text-xs text-gray-500">Weight & volume trends across workouts</p>
              </div>
            </div>

            <div className="px-6 md:px-8 pb-6 md:pb-8">
              {workouts.length > 0 ? (
                <ProgressChart workouts={workouts} />
              ) : (
                <div className="h-[320px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Log workouts to see analytics</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* =========== WORKOUT HISTORY =========== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Workout History</h2>
                  <p className="text-xs text-gray-500">
                    {workouts.length > 0
                      ? `${workouts.length} workout${workouts.length > 1 ? "s" : ""} logged`
                      : "No workouts yet"}
                  </p>
                </div>
              </div>
            </div>

            {/* Workout List or Empty State */}
            {workouts.length > 0 ? (
              <div className="space-y-3">
                {workouts.map((workout, index) => (
                  <WorkoutCard
                    key={workout._id}
                    workout={workout}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="premium-card">
                <EmptyState onAdd={scrollToWorkoutForm} />
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;