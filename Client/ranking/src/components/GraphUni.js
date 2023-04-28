import axios from '../api/axios';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export default function GraphUni({ uni, category, factor }) {
  const [data, setData] = React.useState({});
  const labels = Array.from({ length: 6 }, (_, i) => 2017 + i);
  const [graphData, setGraphData] = React.useState({
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => 100),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  React.useEffect(() => {
    (async function getData() {
      for (let i = 2017; i <= new Date().getFullYear() - 1; i++) {
        const request = await axios.get(`/rankingUni/?year=${i}&category=${category}&uni=${uni}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        const response = request.data;
        setData((prevData) => ({ ...prevData, [i]: response[factor] }));
      }
    })();

    setGraphData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: labels.map((element) => data[element]),
        },
      ],
    }));
  }, [data]);

  return <Line options={options} data={graphData} />;
}
