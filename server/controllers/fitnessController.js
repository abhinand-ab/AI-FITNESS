import FitnessProfile from "../models/FitnessProfile.js";

export const analyzeFitness = async (req, res) => {
  try {

    const {
      userId,
      age,
      gender,
      height,
      weight,
      goal,
      activityLevel,
    } = req.body;

    const bmi =
      weight /
      ((height / 100) * (height / 100));

    let category = "";

    if (bmi < 18.5)
      category = "Underweight";

    else if (bmi < 25)
      category = "Normal";

    else if (bmi < 30)
      category = "Overweight";

    else
      category = "Obese";

    let calories =
      weight * 24;

    if (activityLevel === "Low")
      calories *= 1.2;

    if (activityLevel === "Moderate")
      calories *= 1.55;

    if (activityLevel === "High")
      calories *= 1.9;

    const profile =
      await FitnessProfile.create({
        userId,
        age,
        gender,
        height,
        weight,
        goal,
        activityLevel,
      });

    res.json({
      profile,
      bmi: bmi.toFixed(1),
      category,
      calories:
        Math.round(calories),

      recommendation:
        generateRecommendation(
          goal,
          category
        ),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

function generateRecommendation(
  goal,
  category
) {

  if (
    goal === "Muscle Gain"
  ) {

    return "Focus on progressive overload and protein intake of 1.6–2.2 g/kg bodyweight.";
  }

  if (
    goal === "Fat Loss"
  ) {

    return "Maintain a moderate calorie deficit and prioritize resistance training.";
  }

  return "Maintain consistent training and recovery habits.";
}