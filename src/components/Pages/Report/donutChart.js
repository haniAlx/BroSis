import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { UserStatus } from './data/dataDonut';


import { useState } from 'react'
ChartJS.register(ArcElement, Tooltip, Legend);



const DonutChart = () => {
    const [data, setData] = useState({
        labels: UserStatus.map((data) => data.status +' '+ data.time + ' ' + 'Hour' ), 
        // backgroundColor: [
        //     'black',
        // ],

        datasets: [
            {
                data: UserStatus.map((data) => data.time),
                backgroundColor: [
                    'red',
                    'green',
                    'grey',
                    // 'black',
                ],
                borderWidth: 1,
            },
        ],
    });

    return (
        <div style={{ width: '315px', height: '350px'}}>
            <Doughnut data={data} />
        </div>
    );
};

export default DonutChart;
