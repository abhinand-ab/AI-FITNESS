import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProgressChart({ workouts }) {

  const chartData = {
    labels: workouts.map((workout, index) =>
      `Workout ${index + 1}`
    ),

    datasets: [
      {
        label: "Weight Lifted (kg)",

        data: workouts.map(
          (workout) =>
            workout.weight
        ),

        borderColor:
          "rgb(59,130,246)",

        backgroundColor:
          "rgba(59,130,246,0.4)",

        tension: 0.3,
      },
    ],
  };

  return (
    <Line data={chartData} />
  );
}

export default ProgressChart;