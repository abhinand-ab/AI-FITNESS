import axios from "axios";

const API_URL =
  "http://localhost:5000/api/fitness";

export const analyzeFitness =
  async (fitnessData) => {

    const response =
      await axios.post(
        `${API_URL}/analyze`,
        fitnessData
      );

    return response.data;
};