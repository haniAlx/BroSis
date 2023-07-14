
import { UserData } from "./data/dataValue";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

import { useState } from 'react'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);



const ChartLine = () => {

    const [user, setUserData] = useState({
        labels: UserData.map((user) => user.time),
        datasets: [
            {
                label: "Vehicle Speed History",
                data: UserData.map((user) => user.distance),
                backgroundColor: 'transparent',
                borderColor: "blue",
                pointBorderColor: 'transparent',
                pointBorderWidth: 3,
                tension: 0.4,
            },
        ],
    })
    const options = {
        Plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                min: 30,
                max: 240,
                ticks:{
                    stepSize: 30,
                    callback: (value) => value + 'km/h',
                },
                grid: {
                    borderDash: (30),
                }
            }
        }
    }

    return (
        <div style={{ width: '550px', height: '330px' }}>
            <Line data={user} options={options} />
        </div>
    );
};

export default ChartLine;

