import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProgressChart({ workouts }) {
  const makeGradient = (ctx, from, to) => {
    const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 340);
    g.addColorStop(0, from);
    g.addColorStop(1, to);
    return g;
  };

  const chartData = {
    labels: workouts.map((_, i) => `W${i + 1}`),
    datasets: [
      {
        label: "Weight (kg)",
        data: workouts.map((w) => w.weight),
        borderColor: "#6366F1",
        backgroundColor: (ctx) => makeGradient(ctx, "rgba(99,102,241,0.28)", "rgba(99,102,241,0.0)"),
        borderWidth: 2.5,
        tension: 0.45,
        fill: true,
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#111114",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#818CF8",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Volume (×100)",
        data: workouts.map((w) => Math.round(((w.sets || 0) * (w.reps || 0) * (w.weight || 0)) / 100)),
        borderColor: "#8B5CF6",
        backgroundColor: (ctx) => makeGradient(ctx, "rgba(139,92,246,0.18)", "rgba(139,92,246,0.0)"),
        borderWidth: 2,
        borderDash: [5, 4],
        tension: 0.45,
        fill: true,
        pointBackgroundColor: "#8B5CF6",
        pointBorderColor: "#111114",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "#A78BFA",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          color: "#71717A",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
          font: { family: "'Inter', sans-serif", size: 12, weight: "500" },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17,17,20,0.95)",
        titleColor: "#FAFAFA",
        bodyColor: "#A1A1AA",
        borderColor: "rgba(99,102,241,0.25)",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 14,
        titleFont: { family: "'Inter', sans-serif", size: 13, weight: "600" },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        boxPadding: 6,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.03)", drawBorder: false },
        ticks: {
          color: "#52525B",
          font: { family: "'Inter', sans-serif", size: 11 },
          padding: 8,
        },
        border: { display: false },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.03)", drawBorder: false },
        ticks: {
          color: "#52525B",
          font: { family: "'Inter', sans-serif", size: 11 },
          padding: 10,
        },
        border: { display: false },
      },
      y1: {
        position: "right",
        grid: { display: false },
        ticks: {
          color: "rgba(82,82,91,0.55)",
          font: { family: "'Inter', sans-serif", size: 10 },
          padding: 10,
        },
        border: { display: false },
      },
    },
    animation: { duration: 1200, easing: "easeInOutQuart" },
  };

  return (
    <div style={{ height: 320 }}>
      <Line data={chartData} options={options} />
    </div>
  );
}