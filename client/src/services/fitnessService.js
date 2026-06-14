import axios from "axios";

const API_URL =
  "https://ai-fitness-w90y.onrender.com/api/fitness";

export const analyzeFitness =
  async (fitnessData) => {

    const response =
      await axios.post(
        `${API_URL}/analyze`,
        fitnessData
      );

    return response.data;
};