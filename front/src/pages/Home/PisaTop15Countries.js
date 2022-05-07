import React, { useState } from "react";
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
import {
  CountryButton,
  FlagButton,
  Buttons,
} from "../../styles/Home/HomeStyle";
import pisaTop15 from "../../data/pisaTop15.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const graphMaker = (country) => {
  const options = {
    responsive: false,
    width: 400,
    scales: {
      y: {
        min: 480,
        max: 560,
      },
      x: {
        grid: {
          offset: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `${country}`,
        font: {
          size: 20,
        },
      },
    },
  };
  const labels = Object.keys(pisaTop15[0]).slice(0, -1);
  const filteredData = Object.entries(
    pisaTop15.find((v) => v.Country === country)
  )
    .slice(0, -1)
    .reduce((obj, cur) => {
      obj[cur[0]] = cur[1];
      return obj;
    }, {});

  const data = {
    labels,
    datasets: [
      {
        label: `${country}`,
        data: filteredData,
        backgroundColor: [
          "#faa2c1",
          "#e599f7",
          "#b197fc",
          "#91a7ff",
          "#74c0fc",
        ],
        barThickness: "24",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

const options = {
  responsive: true,
  scales: {
    y: {
      min: 480,
    },
    x: {
      grid: {
        offset: true,
      },
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
        size: 15,
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
      backgroundColor: "#faa2c1",
      categoryPercentage: 1.0,
      barPercentage: 0.8,
    },
    {
      label: "2009",
      data: pisaTop15.map((v) => v["2009"]),
      backgroundColor: "#e599f7",
      categoryPercentage: 1.0,
      barPercentage: 0.8,
    },
    {
      label: "2012",
      data: pisaTop15.map((v) => v["2012"]),
      backgroundColor: "#b197fc",
      categoryPercentage: 1.0,
      barPercentage: 0.8,
    },
    {
      label: "2015",
      data: pisaTop15.map((v) => v["2015"]),
      backgroundColor: "#91a7ff",
      categoryPercentage: 1.0,
      barPercentage: 0.8,
    },
    {
      label: "2018",
      data: pisaTop15.map((v) => v["2018"]),
      backgroundColor: "#74c0fc",
      categoryPercentage: 1.0,
      barPercentage: 0.8,
    },
  ],
};

const PisaTop15BarCountries = () => {
  const [countryTitle, setCountryTitle] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const title = e.target.className.split(" ").slice(-1)[0];
    if (countryTitle === title) return setCountryTitle(null);
    setCountryTitle(title);
  };

  return (
    <>
      {countryTitle ? (
        graphMaker(countryTitle)
      ) : (
        <Bar options={options} data={data} />
      )}
      <Buttons>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/kr.png"}
            alt="South Korea"
            className="대한민국"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/au.png"}
            alt="Australia"
            className="호주"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/be.png"}
            alt="Belgium"
            className="벨기에"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/ca.png"}
            alt="Canada"
            onClick={handleClick}
            className="캐나다"
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/dk.png"}
            alt="Denmark"
            className="덴마크"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/ee.png"}
            alt="Estonia"
            className="에스토니아"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/fi.png"}
            alt="Finland"
            className="핀란드"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/fr.png"}
            alt="France"
            className="프랑스"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/de.png"}
            alt="Germany"
            className="독일"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/ie.png"}
            alt="Ireland"
            className="아일랜드"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/jp.png"}
            alt="Japan"
            className="일본"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/nz.png"}
            alt="New Zealand"
            className="뉴질랜드"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/pl.png"}
            alt="Poland"
            className="폴란드"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/tw.png"}
            alt="Taiwan"
            className="대만"
            onClick={handleClick}
          />
        </CountryButton>
        <CountryButton>
          <FlagButton
            src={"https://flagcdn.com/w40/gb.png"}
            alt="United Kingdom"
            className="영국"
            onClick={handleClick}
          />
        </CountryButton>
      </Buttons>
    </>
  );
};
export default PisaTop15BarCountries;
