import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import pisaKScore from "../../data/pisaKScore.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Pisa score by Subjects",
    },
  },
  scales: {
    y: {
      min: 480,
      title: {
        display: true,
        text: "PISA",
      },
    },
  },
};

const labels = pisaKScore.map((data) => data.Year);

const data = {
  labels,
  datasets: [
    {
      type: "bar",
      label: "수학",
      data: pisaKScore.map((data) => data.Maths),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      type: "bar",
      label: "읽기",
      data: pisaKScore.map((data) => data.Reading),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      type: "line",
      label: "읽기",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: pisaKScore.map((data) => data.Reading),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      type: "bar",
      label: "과학",
      data: pisaKScore.map((data) => data.Science),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function PisaSubjectScoreBar() {
  return <Bar options={options} data={data} />;
}
