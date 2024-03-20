import React, {useMemo} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  );
  
function StackedBarChartPage({expensesByMonthByCategory, pastSixMonths, categories}) {
  
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Expenses by month",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = pastSixMonths;
  const backgroundColors = ["rgb(255, 99, 132)", "rgb(53, 162, 235)", "rgb(53, 235, 68)", "rgb(53, 74, 235)", "rgb(235, 217, 53)", "rgb(159, 53, 235)", "rgb(235, 53, 53)", "rgb(235, 120, 53)"]

  const dataSetBuilder = useMemo(() => {
    let result = []
    for (let i = 0; i < categories.length; i++){
      result.push({
        label: categories[i],
        data: pastSixMonths.map((elem) => {
          return expensesByMonthByCategory[elem]?.[categories[i]] || 0
        }),
        backgroundColor: backgroundColors[i]
      })
    }
    return result;
  }, [pastSixMonths, expensesByMonthByCategory, categories])

  const data = {
    labels,
    datasets: dataSetBuilder
  };

  return (
    <div className="barchart-container">
      <h3>Stacked Bar Chart</h3>
      {data.datasets? <Bar options={options} data={data} /> : <div>Loading...</div>}
    </div>
  );
}

export default StackedBarChartPage;
