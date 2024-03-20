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

function Home({categories, setEditPurchase }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading:isExpensesLoading, isError, message } = useSelector(
    (state) => state.expenses
  );
  const { isLoading: isBudgetLoading} = useSelector(
    (state) => state.budgets
  );

  const yearMonthFormat = (year, month) => {
    // takes in a year and month and converts it to Date format
    return String(year) + "-" + String(month+1).padStart(2, '0')
  }

  useEffect(() => {
    if (isError) {
      console.log(message, isError);
    }

    if (!user) {
      navigate("/login");
    }
 
  }, [user, navigate, isError, message, dispatch, selectedMonth, selectedYear]);

  const uniqueYearMonths = [...new Set(expenses.map(({date}) => date.split("-").slice(0,2).join("-")))].sort();

  const expensesByMonthByCategory = useMemo(() => {
    // creates an object with the Year-Month as keys and as the value an array of the relative categories: amounts for those months
    return uniqueYearMonths.reduce((acc, yearMonth) => ({
    ...acc,
    [yearMonth]: expenses.filter(({date}) => date.startsWith(yearMonth)).reduce((eAcc, {category, price}) => ({
      ...eAcc,
      [category]: price + (eAcc[category] || 0)
    }), {})
  }), {})}, [expenses, uniqueYearMonths]);

  const currentMonthExpenses = useMemo(() => { 
    return expensesByMonthByCategory[yearMonthFormat(selectedYear, selectedMonth)]}, [selectedYear, selectedMonth, expensesByMonthByCategory]);

  const pastSixMonths = useMemo(() => {
      //returns an array of string with the YYYY-MM dates of the last six months including the current one
      let result = []
      const decrementMonth = (year, month, subtrahend) => {
        while (subtrahend > 0){
          if (month > 0)
            month--
          else {
            month = 11
            year--
          }
          subtrahend--
        }
        return [year, month]
      }
      for (let i = 0; i < 6; i++) {
        let decremented = decrementMonth(selectedYear, selectedMonth, i)
        result.unshift(yearMonthFormat(decremented[0], decremented[1]))
      }
      return result
  }, [selectedYear, selectedMonth])

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
          categories={categories}
          />
        </Grid>
        <Grid item order={{xs:3, sm: 3, md: 3}} sx={{width: "100%"}}>
          <Budgets 
          currentMonthExpenses={currentMonthExpenses}
          categories={categories}
          />
        </Grid>
        </Grid>
        <Grid container sx={{paddingY: '5%', alignItems: "center", flexFlow: {xs: "column", sm:"column", md: "row" }}}>
        <Grid sx={{minWidth: '50%'}}>
          <LineGraphPage
          expensesByMonthByCategory={expensesByMonthByCategory}
          pastSixMonths={pastSixMonths}
          categories={categories}
          />
        </Grid>
        <Grid sx={{minWidth: {xs: 0, md: '50%'}, maxWidth:{xs: 'sm'}}}>
          <StackedBarChartPage
          expensesByMonthByCategory={expensesByMonthByCategory}
          pastSixMonths={pastSixMonths}
          categories={categories}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
