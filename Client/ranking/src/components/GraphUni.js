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
      text: '',
    },
  },
    maintainAspectRatio: false,
    animation:false

};

export default function GraphUni({ uni, factor, dataBit,  labels, dataFetch }) {
  const [data, setData] = React.useState({});

  const [graphData, setGraphData] = React.useState({
    labels,
    datasets: [
      {
        label: factor,
        data: labels.map(() => 100),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  React.useEffect(() => {
      dataFetch()
  }, [factor, uni]);

  React.useEffect(() => {
    setData((prevData) => ({ ...prevData, ...dataBit }));
    setGraphData((prevData) => ({
      ...prevData,
      labels,
      datasets: [
        {
          ...prevData.datasets[0],
          label:factor,
          data: labels.map((element) => dataBit[element] || prevData.datasets[0].data[element]),
        },
      ],
    }));
    //console.log(labels)
  }, [dataBit]);

  return (
    <>  
        <div style={{minHeight:'40vh'}}>
            <Line options={options} data={graphData}/>
        </div>
    </>
  );
}
