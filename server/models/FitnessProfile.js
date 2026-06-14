import mongoose from "mongoose";

const fitnessProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: Number,

    gender: String,

    height: Number,

    weight: Number,

    goal: String,

    activityLevel: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "FitnessProfile",
  fitnessProfileSchema
);