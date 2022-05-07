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
import pisaKMeanT from "../../data/pisaKMeanT.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      align: "start",
      borderWidth: 0,
    },
    title: {
      display: true,
      text: "대한민국 Pisa 점수",
      font: {
        size: 20,
      },
    },
  },
  scales: {
    y: {
      min: 490,
      step: 20,
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 6,
      borderWidth: 0,
      hoverRadius: 9,
    },
  },
  layout: {
    padding: {
      left: 10,
    },
  },
};

const labels = pisaKMeanT[0].data.map((v) => v.x);

const data = {
  labels,
  datasets: [
    {
      label: "Male",
      data: pisaKMeanT[0].data,
      borderColor: "rgba(53, 162, 235, 0.8)",
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
    {
      label: "Female",
      data: pisaKMeanT[1].data,
      borderColor: "rgba(255, 99, 132, 0.8)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: "Total",
      data: pisaKMeanT[2].data,
      borderColor: "#F7D050",
      backgroundColor: "#F7D050",
    },
  ],
};

const PisaKMeanT = () => {
  return <Line options={options} data={data} />;
};
export default PisaKMeanT;
