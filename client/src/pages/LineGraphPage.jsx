import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );
  
  function LineGraphPage({expensesByMonthByCategory, pastSixMonths, categories}) {

  const pastSixMonthsDeux = ["2024-10", "2023-11", "2023-12", "2024-01", "2024-02", "2024-03"]
  
  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Change in Expenses",
    },
  },
};

// TO DO
// array of months in a year
// build data from data
// have an array of colors
const labels = pastSixMonths;
const borderColors = ["rgb(255, 99, 132)", "rgb(53, 162, 235)", "rgb(255, 99, 132)", "rgb(53, 162, 235)", "rgb(255, 99, 132)", "rgb(53, 162, 235)"]
const backgroundColors = ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)",] 

// const dataSetBuilder = (cats, exp, pastMonths) => {
//   let result = []
//   for (let i = 0; i < cats; i++){
//     for (let j = 0; j < cats; j++){
//       result.push({
//         label: cats[i],
//         data: (expensesByMonthByCategory[pastSixMonthsDeux[i]][categories[j]] || 0),
//         borderColor: borderColors[i],
//         backgroundColor: backgroundColors[i]
//       })
//     }
//   }
// }

// let theString = pastSixMonths[5]
// console.log(pastSixMonths, "past 6", theString, "and category: ", categories[0])
// console.log(`something working of ${theString}: `, expensesByMonthByCategory[pastSixMonthsDeux[5]][categories[0]])

const data = {
  labels,
  // datasets: dataSetBuilder(categories, expensesByMonthByCategory, pastSixMonths)
  datasets: [
    {
      label: "Dataset 1",
      data: [200, 600, -600, 200, -600, 200, 600],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [300, 100, -400, 200, -300, 700, 200],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

  return (
    <div className="linegraph-container">
      <h5>LineGraphPage</h5>
      <Line options={options} data={data} className="linegraph-container"/>
    </div>
  );
}

export default LineGraphPage;
