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
    </Container>
  );
}

export default Home;