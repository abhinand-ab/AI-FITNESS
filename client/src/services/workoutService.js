import axios from "axios";

const API_URL =
  "http://localhost:5000/api/workouts";

const getToken = () => {
  return localStorage.getItem("token");
};

export const createWorkout =
  async (workoutData) => {

    const response =
      await axios.post(
        API_URL,
        workoutData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};

export const getWorkouts =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};

export const deleteWorkout =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};

export const updateWorkout =
  async (id, workoutData) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        workoutData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
};