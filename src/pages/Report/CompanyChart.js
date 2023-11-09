import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";

import { mainAPI } from "../../components/mainAPI";
const firstEndpointURL =
  `${mainAPI}/Api/Admin/Report/All/Revenue/VehicleOwner/59`;
const secondEndpointURL =
  `${mainAPI}/Api/Admin/Report/All/Revenue/VehicleOwner/5`;

function DriverChart() {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalVehicle",
        data: [],
        backgroundColor: "#FF8C00",
      },
      {
        label: "TotalDriver",
        data: [],
        backgroundColor: "#70b8e9",
      },
      {
        label: "TotalRevenue",
        data: [],
        backgroundColor: "#f4c430",
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        };
        const vehicleOwnersResponse = await fetch(
          `${mainAPI}/Api/Admin/All/VehicleOwners`,
          { headers }
        );
        const vehicleOwnersData = await vehicleOwnersResponse.json();
        console.log(vehicleOwnersData);

      

        const vehicleOwnerINF = Array.isArray(vehicleOwnersData.vehicleOwnerINF)
          ? vehicleOwnersData.vehicleOwnerINF
          : [];
        const companyName = vehicleOwnerINF.map((item) => item.firstName);
        const totalVehicles = vehicleOwnerINF.map((item) => item.totalVehicles);
        const totalDrivers = vehicleOwnerINF.map((item) => item.totalDrivers);
        const revenue = vehicleOwnerINF.map((item) => item.revenue);
        setChartData((prevChartData) => ({
          ...prevChartData,
          labels: companyName,
          datasets: [
            { ...prevChartData.datasets[0], data: totalVehicles },
            { ...prevChartData.datasets[1], data: totalDrivers },
            { ...prevChartData.datasets[2], data: revenue },
          ],
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchChartData();
  }, [jwt]);

const exportChart = (id, dimensions) => {
  const chartEl = document.getElementById(id);
  const image = chartEl.toDataURL('image/png', 1.0);

  const pdf = new jsPDF('landscape');
 
  const width = 150;
  const height = 100;
  pdf.addImage(image, 'PNG', ...dimensions, width, height);
  pdf.save('CompanyChart.pdf');
}

  return (
    <div className="chart-wrapper">
    <div className="chart-box">  
        <Bar
        id="myChart"
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
          width={400}
        />
     </div>

    <button onClick={() => exportChart("myChart", [50, 50, 200, 150])}
    style={{padding:"10px",alignSelf:'right'}}
    >
      Download Chart
      </button>
      </div>

  );
}

export default DriverChart;
