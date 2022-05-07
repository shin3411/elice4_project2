import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import pisaGdp from "../../data/pisaGdp.json";
import ransac from "../../data/ransac.json";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        display: false,
      },
    },
    x: {
      min: 330,
      max: 560,
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
  interaction: {
    mode: "point",
    intersect: true,
  },
  plugins: {
    legend: {
      position: "top",
      // align: "start",
      borderWidth: 0,
    },
    title: {
      display: true,
      text: "Pisa 점수와 Gdp 상관관계",
      font: {
        size: 15,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          const val = `pisa : ${context.parsed.x}, GDP : ${context.parsed.y}`;
          if (label) {
            label = label[context.dataIndex] + " " + val;
          }
          return label;
        },
      },
    },
  },
  elements: {
    point: {
      radius: 5,
      borderWidth: 0,
      hoverRadius: 10,
    },
  },
  datasets: {
    line: {
      pointRadius: 0,
    },
  },
};

const data = {
  datasets: [
    {
      type: "line",
      label: "regression",
      data: ransac[0].data,
      borderColor: "#F6CB3C",
      backgroundColor: "#F7D050",
    },
    {
      type: "scatter",
      label: pisaGdp.map((v) => v.Country),
      data: Array.from(pisaGdp, (v) => ({
        x: v.x,
        y: v.y,
      })),

      backgroundColor: [
        "rgb(119, 190, 130)",
        "rgb(194, 110, 147)",
        "rgb(218, 138, 184)",
        "rgb(171, 207, 181)",
        "rgb(182, 210, 120)",
        "rgb(128, 229, 160)",
        "rgb(162, 129, 188)",
        "rgb(223, 167, 160)",
        "rgb(171, 166, 217)",
        "rgb(155, 246, 119)",
        "rgb(163, 101, 212)",
        "rgb(245, 167, 104)",
        "rgb(138, 164, 244)",
        "rgb(137, 225, 200)",
        "rgb(124, 124, 226)",
        "rgb(104, 182, 214)",
        "rgb(212, 146, 141)",
        "rgb(211, 198, 146)",
        "rgb(143, 200, 112)",
        "rgb(190, 136, 101)",
        "rgb(164, 145, 154)",
        "rgb(254, 116, 178)",
        "rgb(215, 224, 107)",
        "rgb(226, 115, 103)",
        "rgb(199, 119, 240)",
        "rgb(115, 122, 174)",
        "rgb(130, 165, 148)",
        "rgb(112, 237, 105)",
        "rgb(144, 171, 188)",
        "rgb(108, 147, 193)",
        "rgb(255, 125, 124)",
        "rgb(201, 174, 193)",
        "rgb(183, 140, 255)",
        "rgb(111, 252, 191)",
        "rgb(227, 101, 250)",
        "rgb(100, 192, 172)",
        "rgb(129, 203, 223)",
        "rgb(107, 229, 216)",
        "rgb(150, 194, 158)",
        "rgb(211, 101, 207)",
        "rgb(235, 200, 118)",
        "rgb(194, 176, 125)",
        "rgb(176, 239, 141)",
        "rgb(160, 169, 106)",
        "rgb(100, 200, 251)",
        "rgb(136, 101, 166)",
        "rgb(103, 221, 134)",
        "rgb(156, 130, 241)",
        "rgb(100, 102, 213)",
        "rgb(192, 252, 106)",
        "rgb(250, 154, 145)",
        "rgb(190, 142, 202)",
        "rgb(156, 124, 130)",
        "rgb(236, 132, 210)",
        "rgb(100, 153, 234)",
        "rgb(236, 103, 158)",
        "rgb(154, 248, 174)",
        "rgb(184, 183, 168)",
        "rgb(117, 254, 139)",
        "rgb(142, 152, 121)",
        "rgb(117, 101, 250)",
        "rgb(183, 102, 116)",
        "rgb(182, 103, 182)",
        "rgb(210, 186, 100)",
        "rgb(253, 100, 219)",
        "rgb(196, 218, 164)",
        "rgb(143, 139, 209)",
        "rgb(254, 217, 103)",
        "rgb(171, 101, 255)",
        "rgb(155, 188, 234)",
        "rgb(169, 229, 100)",
        "rgb(106, 197, 100)",
        "rgb(100, 150, 154)",
        "rgb(120, 143, 255)",
        "rgb(217, 100, 130)",
      ],
    },
  ],
};

const PisaGdpScatter = () => {
  return <Scatter options={options} data={data} />;
};
export default PisaGdpScatter;
