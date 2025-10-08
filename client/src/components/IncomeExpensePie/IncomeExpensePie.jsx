// src/components/IncomeExpenseBar.jsx
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function IncomeExpenseBar({ income = 0, expense = 0 }) {
  const data = useMemo(() => ({
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [Number(income) || 0, Number(expense) || 0],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: ["#16a34a", "#9ca3af"],
        borderWidth: 1,
      },
    ],
  }), [income, expense]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }), []);

  return (
    <div style={{ width: "100%", maxWidth: 500, height: 320, marginInline: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
