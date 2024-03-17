import React, { useEffect, useState, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Expenses from "./Expenses";
import Budgets from "./Budgets";
import { Box, Container, Grid} from "@mui/material";
import PieChartPage from "./PieChartPage";
import BasicModal from "../components/BasicModal";
import Spinner from "../components/Spinner";
import LineGraphPage from "./LineGraphPage";
import StackedBarChartPage from "./StackedBarChartPage";

function Home({ setEditPurchase }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState()

  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading:isExpensesLoading, isError, message } = useSelector(
    (state) => state.expenses
  );
  const { isLoading: isBudgetLoading} = useSelector(
    (state) => state.budgets
  );

  useEffect(() => {
    if (isError) {
      console.log(message, isError);
    }
    console.log("user", user)
    if (!user) {
      navigate("/login");
    }

    setCurrentMonthExpenses(expensesByMonthByCategory[String(selectedYear) + "-" + String(selectedMonth+1).padStart(2, '0')])

  }, [user, navigate, isError, message, dispatch, selectedMonth, selectedYear]);

  const uniqueYearMonths = [...new Set(expenses.map(({date}) => date.split("-").slice(0,2).join("-")))].sort();

  // creates an object with the Year-Month as keys and as the value an array of the relative categories: amounts for those months
  const expensesByMonthByCategory = useMemo(() => {
    return uniqueYearMonths.reduce((acc, yearMonth) => ({
    ...acc,
    [yearMonth]: expenses.filter(({date}) => date.startsWith(yearMonth)).reduce((eAcc, {category, price}) => ({
      ...eAcc,
      [category]: price + (eAcc[category] || 0)
    }), {})
  }), {})}, [expenses, uniqueYearMonths]);

  console.log("expensesByMonthByCategory", expensesByMonthByCategory)
//   console.log("date: " + String(selectedYear) + "-" + String(selectedMonth).padStart(2, '0'))
// console.log("selected month expense", expensesByMonthByCategory[String(selectedYear) + "-" + String(selectedMonth+1).padStart(2, '0')])

//object of months that will be displayed in the line graph and stacked bar chart. These will be the last 6 months including the current one. The key will be the month in YYYY-MM format while the value will be the labels.

//TO DO



  if (isExpensesLoading || isBudgetLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <BasicModal
        title=""
        buttonIcon="Getting Started"
        modalTitle="First Things First"
        description="Start by adding a purchase from the list of expenses. The budget setting feature is not essential."
      />
      <Box sx={{display: {xs:"none", md:"block"}, padding: {sm:0, md:0.5}}}>
        <h2>Welcome {user && user.email.split('@')[0].toUpperCase()} to your expenses dashboard</h2>
      </Box>
      <Grid container sx={{flexFlow: {xs: "column", sm:"column", md: "row" }}}>
        <Grid item order={{xs:2, sm: 2, md: 1}} width={1}>
          <Expenses
            setEditPurchase={setEditPurchase}
            expenses={expenses}
          />
        </Grid>
        <Grid item order={{xs:1, sm: 1, md: 2}} width={1}>
          <PieChartPage 
          selectedMonth={selectedMonth} 
          setSelectedMonth={setSelectedMonth} 
          selectedYear={selectedYear} 
          setSelectedYear={setSelectedYear}
          />
        </Grid>
        <Grid item order={{xs:3, sm: 3, md: 3}}>
          <Budgets 
          selectedMonth={selectedMonth} 
          currentMonthExpenses={currentMonthExpenses}
          />
        </Grid>
        </Grid>
        <Grid container sx={{flexFlow: {xs: "column", sm:"column", md: "row" }}}>
        <Grid>
          <LineGraphPage
          expensesByMonthByCategory={expensesByMonthByCategory}
          />
        </Grid>
        <Grid>
          <StackedBarChartPage
          expensesByMonthByCategory={expensesByMonthByCategory}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
