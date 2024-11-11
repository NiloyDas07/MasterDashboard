"use client";

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

import lineChartData from "../data/lineGraphData.json";
import { Card, CardContent } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User Activity",
      font: { size: 16, weight: "bold" as const },
      padding: { top: 10, bottom: 30 },
      color: "black",
      align: "start" as const,
    },
  },
};

const data = {
  labels: lineChartData.map((item) => item.day),
  datasets: [
    {
      label: "Active users",
      data: lineChartData.map((item) => item.numberOfUsers),
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const LineChart: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-2">
        <div className="relative w-full overflow-x-auto">
          <Line options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
