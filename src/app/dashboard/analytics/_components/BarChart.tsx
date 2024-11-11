"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import barChartData from "../data/barGraphData.json";
import { Card, CardContent } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sales Permormance",
      font: { size: 16, weight: "bold" as const },
      padding: { top: 10, bottom: 30 },
      color: "black",
      align: "start" as const,
    },
  },
};

const data = {
  labels: barChartData.map((item) => item.month),
  datasets: [
    {
      label: "Sales Performance",
      data: barChartData.map((item) => item.sales),
      backgroundColor: "#c3a7ff",
      borderColor: "#c3a7ff",
      borderWidth: 1,
    },
  ],
};

const BarChart: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-2">
        <div className="relative w-full overflow-x-auto">
          <Bar options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
