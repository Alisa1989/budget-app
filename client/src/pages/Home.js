import React, { useEffect, useState } from "react";
import Expenses from "./Expenses";
import Budgets from "./Budgets";
import CreateBudget from "../components/CreateBudget";

function Home({setEditPurchase}) {

  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  const loadPurchases = async () => {
    const response = await fetch('/log', {
        method: 'get'
    });
    const expenses = await response.json();
    console.log("expenses", expenses)
    setExpenses(expenses)
}

  const loadBudgets = async () => {
    const response = await fetch('/budgets', {
        method: 'get'
    });
    const list = await response.json();
    console.log("list", list)
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
    <>
      <h2>Home Page</h2>
      <Expenses 
        setEditPurchase={setEditPurchase} 
        expenses = {expenses}
        />
      <Budgets 
        budgets = {budgets}
      />
      <CreateBudget/>
    </>
  );
}

export default Home;