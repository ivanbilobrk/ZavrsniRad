import '../dist/output.css'
import { ClockIcon } from '@heroicons/react/24/solid';
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

export default function GraphUni({ uni, factor, labels, dataFetch, isExpanded, dataSets }) {
  const[loading, setLoading] = React.useState(false)

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
    if(isExpanded){
      setLoading(true)
      dataFetch()
      setLoading(false)
    }
  }, [factor, uni, isExpanded]);

  React.useEffect(() => {
    setGraphData((prevData) => ({
      ...prevData,
      labels,
      datasets: dataSets,
    }));
  }, [dataSets]);

  return (
    <>  
          {loading ? (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-5 rounded-md z-20 flex items-center justify-center">
              <div className="absolute p-3 bg-white w-36 shadow-md rounded-md text-center">
                <div className="flex animate-pulse">
                  <ClockIcon className="w-6 h-6 mr-1" /> <span>Loading...</span>
                </div>
              </div>
            </div>
          ) : null}
        

         <div style={{minHeight:'40vh'}}>
          <Line options={options} data={graphData}/>
         </div>
        

    </>
  );
}
