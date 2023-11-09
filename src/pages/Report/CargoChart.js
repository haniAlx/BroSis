import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { mainAPI } from "../../components/mainAPI";
import jsPDF from "jspdf";


function CargoChart() {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "TotalRevenue",
        data: [],
        backgroundColor: "#FF8C00",
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
        const vehicleOwnersResponse = await fetch(`${mainAPI}/Api/Admin/All/CargoOwners`, {
          headers,
        });
        const vehicleOwnersData = await vehicleOwnersResponse.json();
        console.log(vehicleOwnersData);

        const cargoOwners = Array.isArray(vehicleOwnersData.cargoOwners)
          ? vehicleOwnersData.cargoOwners
          : [];
        const ownerName = cargoOwners.map((item) => item.ownerName);
        const revenue = cargoOwners.map((item) => item.revenue);

        setChartData((prevChartData) => ({
          ...prevChartData,
          labels: ownerName,
          datasets: [{ ...prevChartData.datasets[0], data: revenue }],
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchChartData();
  }, [jwt]);

  const exportChart = (id, dimensions) => {
    const chartEl = document.getElementById(id);
    const image = chartEl.toDataURL("image/png", 1.0);

    const pdf = new jsPDF("landscape");

    const width = 150;
    const height = 100;
    pdf.addImage(image, "PNG", ...dimensions, width, height);
    pdf.save("CargoChart.pdf");
  };
console.log(chartData)
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
      <button
        onClick={() => exportChart("myChart", [50, 50, 200, 150])}
        style={{ padding: "10px",alignSelf:'right'}}
      >
        Download Chart
      </button>
    </div>
  );
}

export default CargoChart;
