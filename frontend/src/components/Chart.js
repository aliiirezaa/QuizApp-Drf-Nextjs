import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend); 

function Chart(props) {
  const data = {
    labels :props.labels,
    datasets: [
      {
        data:props.data ,
        backgroundColor:[
          '#4CAF50',
          '#C62828',
          '#FB8C00'
        ],
        borderColor:[
          '#4CAF50',
          '#C62828',
          '#FB8C00'
        ],
        borderWidth:1
      }
    ]
  }
  return (
    <Pie data={data} />
  )
}

export default Chart