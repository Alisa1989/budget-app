import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function PieChart({ chartData }) {

  let display;
  if (chartData["datasets"][0]["data"].length === 0)
    display = "There are no expenses logged for this month"
  else
    display = <Pie oprtions={options} data={chartData}/>

  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Pie Chart</h2> */}
      {/* {chartData && <Pie
        aria-label="expenses pie chart" 
        role="img"
        redraw={true}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false, 
          plugins: {
            title: {
              display: true,
              text: "Expenses"
            }
          }
        }}
      />} */}
      {display}
    </div>
  );
}
export default PieChart;