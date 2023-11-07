import React, { useEffect, useState } from "react";
import Expenses from "./Expenses";
import Budgets from "./Budgets";
import { Box, Stack } from "@mui/material"
import PieChartPage from "./PieChartPage";

function Home({setEditPurchase}) {

  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  const loadPurchases = async () => {
    const response = await fetch('/api/invoices', {
        method: 'get'
    });
    const expenses = await response.json();
    // console.log("expenses", expenses)
    setExpenses(expenses)
  }

  const loadBudgets = async () => {
    const response = await fetch('/api/budgets', {
        method: 'get'
    });
    const list = await response.json();
    // console.log("list", list)
    setBudgets(list)
  }

  useEffect(() => {
    loadPurchases();
    loadBudgets();
  }, [])

  // const categories = []
  const categories = expenses.map((elem) => {
    return elem.category
  })

  console.log("categories", categories);


  return (
    <Box sx={{backgroundColor: "pink", margin: "20px", padding: "20px"}}>
      <Stack direction="row" spacing={3} >
        <Expenses 
          setEditPurchase={setEditPurchase} 
          expenses = {expenses}
          />
        
        <PieChartPage
          expenses = {expenses}
          />
        <Budgets 
          budgets = {budgets}
          />
      </Stack>
    </Box>
  );
}

export default Home;