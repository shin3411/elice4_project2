import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import literacyEmployeeScatter from "../../data/literacyEmployeeScatter.json";
import womenliteracyEmployeeReg from "../../data/womenliteracyEmployeeReg.json";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "문해력과 고용률",
      font: {
        size: 15,
      },
    },
    legend: {
      position: "chartArea",
      align: "start",
      borderWidth: 0,
    },
  },
  scales: {
    y: {
      beginAtZero: true,

      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      borderWidth: 0,
      hoverRadius: 9,
    },
  },
  datasets: {
    line: {
      pointRadius: 0,
    },
  },
};

export const data = {
  datasets: [
    {
      type: "scatter",
      label: "literacy employee",
      data: Array.from(literacyEmployeeScatter[0].data, (v) => ({
        x: v.x,
        y: v.y,
      })),

      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },

    {
      type: "line",
      label: "Regression",
      data: womenliteracyEmployeeReg[0].data,
      borderColor: "#F8D563",
      backgroundColor: "#F8D563",
    },
  ],
};

const PisaEmployee = () => {
  return <Scatter options={options} data={data} />;
};

export default PisaEmployee;
