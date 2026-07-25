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

        borderColor: "#6366F1",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.25)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");
          return gradient;
        },

        borderWidth: 2.5,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#18181B",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#818CF8",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Volume (sets × reps × weight)",
        data: workouts.map(
          (w) => (w.sets || 0) * (w.reps || 0) * (w.weight || 0)
        ),
        borderColor: "#8B5CF6",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(139, 92, 246, 0.15)");
          gradient.addColorStop(1, "rgba(139, 92, 246, 0.0)");
          return gradient;
        },
        borderWidth: 2,
        borderDash: [6, 4],
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#8B5CF6",
        pointBorderColor: "#18181B",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "#A78BFA",
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#9CA3AF',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(24, 24, 27, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: '#9CA3AF',
        borderColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 14,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 13,
          weight: '600',
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        displayColors: true,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
            size: 11,
            weight: '500',
          },
          padding: 8,
        },
        border: {
          display: false,
        },
      },
      y: {
        position: 'left',
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
            size: 11,
            weight: '500',
          },
          padding: 12,
        },
        border: {
          display: false,
        },
      },
      y1: {
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B728060',
          font: {
            family: "'Inter', sans-serif",
            size: 10,
          },
          padding: 12,
        },
        border: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div style={{ height: '320px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ProgressChart;