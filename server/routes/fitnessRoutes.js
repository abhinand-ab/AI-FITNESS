import express from "express";
import {
  analyzeFitness,
} from "../controllers/fitnessController.js";

const router = express.Router();

router.post(
  "/analyze",
  analyzeFitness
);

export default router;