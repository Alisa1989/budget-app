import React, { useEffect, useState } from "react";
import Expenses from "./Expenses";
import Budgets from "./Budgets";
import { Box, Container, Stack } from "@mui/material"
import PieChartPage from "./PieChartPage";
import BasicModal from "../components/BasicModal";

function Home({setEditPurchase}) {

  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])
  
  const loadPurchases = async () => {
    const response = await fetch('/api/invoices', {
      method: 'get'
    });
    const expenses = await response.json();
    setExpenses(expenses)
  }
  
  const loadBudgets = async () => {
    const response = await fetch('/api/budgets', {
      method: 'get'
    });
    const list = await response.json();
    setBudgets(list)
  }
  
  useEffect(() => {
    loadPurchases();
    loadBudgets();
  }, [])
  
  //expenses grouped by category
  const groupedExpenses = expenses.reduce((expense, item) => {
    const category = item.category;
    const price = item.price;
    if (!expense.hasOwnProperty(category)) {
      expense[category] = 0;
    }
    
    expense[category] += price;
    return expense;
  }, {});
  
  return (
    <Container>
        <BasicModal 
          buttonIcon= "Getting Started"
          modalTitle="First Things First"
          description="Start by adding a purchase from the list of expenses. The budget setting feature is not essential."
        />
    <Box sx={{margin: "20px", padding: "20px"}}>
      <Stack sx = {{flexDirection: { xs: "column", md: "row"}}} >
        <Expenses 
          setEditPurchase={setEditPurchase} 
          setExpenses = {setExpenses}
          expenses = {expenses}
          />
        
        <PieChartPage
          groupedExpenses = {groupedExpenses}
          />
        <Budgets 
          budgets = {budgets}
          groupedExpenses = {groupedExpenses}
          />
      </Stack>
    </Box>
    </Container>
  );
}

export default Home;