import React, {useMemo} from "react";
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

const labels = pastSixMonths;
const borderColors = ["rgb(255, 99, 132)", "rgb(53, 162, 235)", "rgb(53, 235, 68)", "rgb(53, 74, 235)", "rgb(235, 217, 53)", "rgb(159, 53, 235)", "rgb(235, 53, 53)", "rgb(235, 120, 53)"]
const backgroundColors = ["rgb(255, 99, 132, 0.5)", "rgb(53, 162, 235, 0.5)", "rgb(53, 235, 68, 0.5)", "rgb(53, 74, 235, 0.5)", "rgb(235, 217, 53, 0.5)", "rgb(159, 53, 235, 0.5)", "rgb(235, 53, 53, 0.5)", "rgb(235, 120, 53, 0.5)"] 

const dataSetBuilder = useMemo(() => {
  let result = []
  for (let i = 0; i < categories.length; i++){
    result.push({
      label: categories[i],
      data: pastSixMonths.map((elem) => {
        return expensesByMonthByCategory[elem]?.[categories[i]] || 0
      }),
      borderColor: borderColors[i],
      backgroundColor: backgroundColors[i]
    })
  }
  return result;
}, [expensesByMonthByCategory, pastSixMonths, categories])

const data = {
  labels,
  datasets: dataSetBuilder
};

  return (
    <div className="linegraph-container">
      <h3>Line Graph</h3>
      {data.datasets? <Line options={options} data={data}/> : <div>Loading...</div>}
    </div>
  );
}

export default LineGraphPage;
