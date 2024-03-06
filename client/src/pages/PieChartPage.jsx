import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";
import PieChart from "../components/PieChart";
import CreatePage from "./CreatePage";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartPage() {
  
  const { expenses, isLoading, isError, message } = useSelector(
    (state) => state.expenses
  );

  let [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  let currentYear = new Date().getFullYear()
  console.log("month selected", currentMonth)
  let [monthlyExpenses, setMonthlyExpenses] = useState([])
  
  const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const previousMonth = () => {
    setCurrentMonth(currentMonth -= 1)
  }
  
  const nextMonth = () => {
    setCurrentMonth(currentMonth += 1)
  }

  useEffect(()=> {
    setMonthlyExpenses(expenses.filter(exp => {
      let [year, month] = exp.date.split('-')
      return (currentMonth+1 === +month) && (currentYear === +year)
    }))
  }, [currentMonth])

  const groupedExpenses = monthlyExpenses.reduce((expense, item) => {
    const category = item.category;
    const price = item.price;
    if (!expense.hasOwnProperty(category)) {
      expense[category] = 0;
    }
    expense[category] += price;
    return expense;
  }, {});

  const grandTotal = monthlyExpenses.reduce((total, item) => {
    return total + item.price;
  }, 0)

    const BGColors = [
        "#42A5F5",
        "#66BB6A",
        "#FFA726",
        "#d90000",
        "#8a0bd9",
        "#1a3dd9",
        "#42d13b"
    ];
    const BGHoverColors = [
        "#64B5F6",
        "#81C784",
        "#FFB74D",
        "#f70000",
        "#a940df",
        "#1f48ff",
        "#75df66"
    ];

    const chartData = {
        labels: Object.keys(groupedExpenses), 
        datasets: [
            {
                label: "Expenses",
                data: Object.values(groupedExpenses),
                backgroundColor: BGColors,
                hoverBackgroundColor: BGHoverColors,
                borderColor: "black",
                borderWidth: 2
            }
        ]}
    
    console.log("groupedExpenses", groupedExpenses);

  return (
    <div>
      <BasicModal
                title= {`${monthsOfTheYear[currentMonth]}'s Expenses`}
                buttonIcon= {<FcInfo />}
                modalTitle="The Pie Chart"
                description="Gives you an overall view of your spending habits"
                />
                <div className="piechart-container">
                  <Button onClick={previousMonth}
                    title="previous month" 
                    className="piechart-buttons left">
                    <SlArrowLeft/>
                  </Button>
                  <PieChart chartData={chartData}/>
                  <Button onClick={nextMonth}
                    title="next month" 
                    className="piechart-buttons right">
                    <SlArrowRight/>
                  </Button>
                </div>
                  
      {`This Month's Total: ${grandTotal}`}
      <CreatePage/>
    </div>
  );
}

export default PieChartPage;
