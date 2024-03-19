import React from "react";
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

const options = {
  plugins: {
    title: {
      display: true,
      text: "How do expenses compare with budgets",
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

// TO DO
// could use to compare budgets with expenses
// negatives for going over budget

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [200, 600, -600, 200, -600, 200, 600],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [300, 100, -400, 200, -300, 700, 200],
      backgroundColor: "rgb(75, 192, 192)",
    },
    // {
    //   label: "Dataset 3",
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   backgroundColor: "rgb(53, 162, 235)",
    // },
  ],
};

function StackedBarChartPage({expensesByMonthByCategory, pastSixMonths}) {
  console.log("expensesByMonthByCategory". expensesByMonthByCategory)
  return (
    <div className="barchart-container">
      <h5>StackedBarChartPage</h5>
      <Bar options={options} data={data} />
    </div>
  );
}

export default StackedBarChartPage;
