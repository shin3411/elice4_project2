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
import pisaTop15 from "../../data/pisaTop15.json";

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
  scales: {
    y: {
      min: 480,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "국가별 Pisa 점수 top 15",
      font: {
        size: 20,
      },
    },
  },
};

const labels = pisaTop15.map((v) => v.Country);

const data = {
  labels,
  datasets: [
    {
      label: "2006",
      data: pisaTop15.map((v) => v["2006"]),
      backgroundColor: "#EF476F",
    },
    {
      label: "2009",
      data: pisaTop15.map((v) => v["2009"]),
      backgroundColor: "#FFD166",
    },
    {
      label: "2012",
      data: pisaTop15.map((v) => v["2012"]),
      backgroundColor: "#06D6A0",
    },
    {
      label: "2015",
      data: pisaTop15.map((v) => v["2015"]),
      backgroundColor: "#118AB2",
    },
    {
      label: "2018",
      data: pisaTop15.map((v) => v["2018"]),
      backgroundColor: "#073B4C",
    },
  ],
};

const PisaTop15Bar = () => {
  return <Bar options={options} data={data} />;
};
export default PisaTop15Bar;
