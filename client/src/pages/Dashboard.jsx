import { useEffect, useRef, useState } from "react";
import ProgressChart from "../components/ProgressChart";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../services/workoutService";
import { analyzeFitness } from "../services/fitnessService";

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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900 p-6 flex justify-between items-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl mb-8">
          <h1 className="text-3xl font-bold">AI Fitness Dashboard</h1>
          <p className="text-slate-400">Welcome {user?.name}</p>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
            <h3 className="text-slate-400">Total Workouts</h3>
            <p className="text-4xl font-bold">{workouts.length}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
            <h3 className="text-slate-400">BMI</h3>
            <p className="text-4xl font-bold">{fitnessResult ? fitnessResult.bmi : "--"}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
            <h3 className="text-slate-400">Calories</h3>
            <p className="text-4xl font-bold">
              {fitnessResult ? fitnessResult.calories : "--"}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800">
            <h3 className="text-slate-400">Total Volume</h3>
            <p className="text-4xl font-bold">{totalVolume}</p>
          </div>
        </div>

        {/* Fitness Assessment */}
        <div className="bg-slate-900 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-5">Fitness Assessment</h2>

          <form
            onSubmit={handleAnalyze}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <input
              name="age"
              placeholder="Age"
              value={fitnessData.age}
              onChange={handleFitnessChange}
              className="bg-slate-800 p-3 rounded"
            />

            <input
              name="height"
              placeholder="Height (cm)"
              value={fitnessData.height}
              onChange={handleFitnessChange}
              className="bg-slate-800 p-3 rounded"
            />

            <input
              name="weight"
              placeholder="Weight (kg)"
              value={fitnessData.weight}
              onChange={handleFitnessChange}
              className="bg-slate-800 p-3 rounded"
            />

            <select
              name="gender"
              value={fitnessData.gender}
              onChange={handleFitnessChange}
              className="bg-slate-800 p-3 rounded"
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <select
              name="goal"
              value={fitnessData.goal}
              onChange={handleFitnessChange}
              className="bg-slate-800 p-3 rounded"
            >
              <option>Muscle Gain</option>
              <option>Fat Loss</option>
              <option>General Fitness</option>
            </select>

            <select
              name="activityLevel"
              value={fitnessData.activityLevel}
              onChange={handleFitnessChange}
              className="bg-slate-800 p-3 rounded"
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded lg:col-span-3"
            >
              Analyze Fitness
            </button>
          </form>

          {fitnessResult && (
            <div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800 p-4 rounded">
                  <h4 className="text-slate-400">BMI</h4>
                  <p className="text-3xl font-bold">{fitnessResult.bmi}</p>
                </div>

                <div className="bg-slate-800 p-4 rounded">
                  <h4 className="text-slate-400">Category</h4>
                  <p className="text-3xl font-bold">{fitnessResult.category}</p>
                </div>

                <div className="bg-slate-800 p-4 rounded">
                  <h4 className="text-slate-400">Calories</h4>
                  <p className="text-3xl font-bold">{fitnessResult.calories}</p>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded mt-4">
                <h4 className="text-slate-400 mb-2">Recommendation</h4>
                <p>{fitnessResult.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Workout Form */}
        <div ref={workoutFormRef} className="bg-slate-900 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-5">Log Workout</h2>

          <form onSubmit={handleWorkoutSubmit} className="grid md:grid-cols-4 gap-4">
            <input
              name="exercise"
              placeholder="Exercise"
              value={workoutData.exercise}
              onChange={handleWorkoutChange}
              className="bg-slate-800 p-3 rounded"
            />

            <input
              name="sets"
              placeholder="Sets"
              value={workoutData.sets}
              onChange={handleWorkoutChange}
              className="bg-slate-800 p-3 rounded"
            />

            <input
              name="reps"
              placeholder="Reps"
              value={workoutData.reps}
              onChange={handleWorkoutChange}
              className="bg-slate-800 p-3 rounded"
            />

            <input
              name="weight"
              placeholder="Weight"
              value={workoutData.weight}
              onChange={handleWorkoutChange}
              className="bg-slate-800 p-3 rounded"
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 p-3 rounded md:col-span-4"
            >
              {editingId ? "Update Workout" : "Save Workout"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setWorkoutData({
                    exercise: "",
                    sets: "",
                    reps: "",
                    weight: "",
                  });
                  setEditingId(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 p-3 rounded md:col-span-4"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Progress Analytics */}
        <div className="bg-slate-900 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-5">Progress Analytics</h2>
          <ProgressChart workouts={workouts} />
        </div>

        {/* Workout History */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-5">Workout History</h2>

          <div className="space-y-3">
            {workouts.map((workout) => (
              <div
                key={workout._id}
                className="bg-slate-800 p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{workout.exercise}</h3>
                  <p className="text-slate-400">
                    {workout.sets} Sets x {workout.reps} Reps
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="font-bold">{workout.weight} kg</div>

                  <button
                    onClick={() => handleEdit(workout)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(workout._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;