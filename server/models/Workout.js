import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exercise: {
      type: String,
      required: true,
    },

    sets: {
      type: Number,
      required: true,
    },

    reps: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model(
  "Workout",
  workoutSchema
);

export default Workout;