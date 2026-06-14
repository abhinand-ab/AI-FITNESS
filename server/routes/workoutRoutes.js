import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
const router = express.Router();

router.post("/", protect, createWorkout);
router.get("/", protect, getWorkouts);
router.delete(
  "/:id",
  protect,
  deleteWorkout
);
router.put(
  "/:id",
  protect,
  updateWorkout
);

export default router;