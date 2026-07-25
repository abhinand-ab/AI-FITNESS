import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Services (unchanged)
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../services/workoutService";
import { analyzeFitness } from "../services/fitnessService";

// Layout
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// Panels
import OverviewPanel from "../components/panels/OverviewPanel";
import AnalyticsPanel from "../components/panels/AnalyticsPanel";
import WorkoutsPanel from "../components/panels/WorkoutsPanel";
import ProgressPanel from "../components/panels/ProgressPanel";
import AICoachPanel from "../components/panels/AICoachPanel";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};
const pageTransition = { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] };

export default function Dashboard() {
  // ── Auth ──
  const user = JSON.parse(localStorage.getItem("user"));

  // ── UI State ──
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Workout State ──
  const [workouts, setWorkouts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [workoutData, setWorkoutData] = useState({
    exercise: "", sets: "", reps: "", weight: "",
  });
  const workoutFormRef = useRef(null);

  // ── Fitness State ──
  const [fitnessData, setFitnessData] = useState({
    age: "", gender: "Male", height: "", weight: "",
    goal: "Muscle Gain", activityLevel: "Moderate",
  });
  const [fitnessResult, setFitnessResult] = useState(null);

  // ── Computed ──
  const totalVolume = workouts.reduce(
    (sum, w) => sum + w.weight * w.reps * w.sets,
    0
  );

  // ── Load workouts ──
  useEffect(() => { loadWorkouts(); }, []);

  const loadWorkouts = async () => {
    try {
      setWorkouts(await getWorkouts());
    } catch (e) {
      console.error(e);
    }
  };

  // ── Handlers (ALL ORIGINAL LOGIC PRESERVED) ──

  const handleFitnessChange = (e) =>
    setFitnessData({ ...fitnessData, [e.target.name]: e.target.value });

  const handleWorkoutChange = (e) =>
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });

  const handleEdit = (workout) => {
    setWorkoutData({
      exercise: workout.exercise || "",
      sets: workout.sets || "",
      reps: workout.reps || "",
      weight: workout.weight || "",
    });
    setEditingId(workout._id);
    setActiveSection("workouts");
    setTimeout(() => workoutFormRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleCancelEdit = () => {
    setWorkoutData({ exercise: "", sets: "", reps: "", weight: "" });
    setEditingId(null);
  };

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    try {
      const result = await analyzeFitness({ userId: user.id, ...fitnessData });
      setFitnessResult(result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateWorkout(editingId, workoutData);
      } else {
        await createWorkout(workoutData);
      }
      setWorkoutData({ exercise: "", sets: "", reps: "", weight: "" });
      setEditingId(null);
      loadWorkouts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);
      loadWorkouts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const goToAddWorkout = () => {
    setActiveSection("workouts");
    setTimeout(() => workoutFormRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // ── Panel renderer ──
  const renderPanel = () => {
    switch (activeSection) {
      case "overview":
        return (
          <OverviewPanel
            user={user}
            workouts={workouts}
            fitnessResult={fitnessResult}
            totalVolume={totalVolume}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddWorkout={goToAddWorkout}
          />
        );
      case "analytics":
        return <AnalyticsPanel workouts={workouts} />;
      case "workouts":
        return (
          <WorkoutsPanel
            workouts={workouts}
            workoutData={workoutData}
            editingId={editingId}
            onWorkoutChange={handleWorkoutChange}
            onWorkoutSubmit={handleWorkoutSubmit}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCancelEdit={handleCancelEdit}
            formRef={workoutFormRef}
          />
        );
      case "progress":
        return <ProgressPanel workouts={workouts} />;
      case "ai-coach":
        return (
          <AICoachPanel
            fitnessData={fitnessData}
            onFitnessChange={handleFitnessChange}
            onAnalyze={handleAnalyze}
            fitnessResult={fitnessResult}
          />
        );
      case "settings":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-8 text-center"
          >
            <p className="text-white font-semibold mb-2">Settings</p>
            <p className="text-sm text-[var(--txt-3)]">Account settings coming soon.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <Sidebar
        active={activeSection}
        onChange={setActiveSection}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Topbar */}
      <Topbar
        user={user}
        activeSection={activeSection}
        onLogout={handleLogout}
        onMenuClick={() => setMobileOpen(true)}
      />

      {/* Main Content */}
      <main className="main-layout">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
            >
              {renderPanel()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}