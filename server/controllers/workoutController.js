import Workout from "../models/Workout.js";

export const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      userId: req.user.id,
      exercise: req.body.exercise,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
    });

    res.status(201).json(workout);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.user.id,
    });

    res.json(workouts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteWorkout = async (req, res) => {
  try {

    const workout =
      await Workout.findById(
        req.params.id
      );

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    if (
      workout.userId.toString() !==
      req.user.id
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Workout.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Workout deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const updateWorkout = async (req, res) => {
  try {

    const workout =
      await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    if (
      workout.userId.toString() !==
      req.user.id
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedWorkout =
      await Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedWorkout);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};