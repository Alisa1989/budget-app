import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';
import BudgeePage from './pages/BudgeePage';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, reset } from './features/expenses/ExpenseSlice';
import { getBudgets } from './features/budgets/BudgetSlice';
import BudgetEditPage from './pages/BudgetEditPage';
import { reset as resetExpenses} from './features/expenses/ExpenseSlice';
import { reset as resetBudgets } from './features/budgets/BudgetSlice';
import './App.css';
import Footer from './components/Footer';

function App() {
  const categories = ["cars", "food", "healthcare", "house", "kids", "rent", "other" ]

  const [purchase, setEditPurchase] = useState([])
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );


  useEffect(()=> {
    if (user) {
      console.log("Dispatched getExpenses and getBudgets")
      dispatch(getExpenses());
      dispatch(getBudgets());
    } else {
      dispatch(resetExpenses());
      dispatch(resetBudgets());
    }
  },[dispatch, user])

  return (
    
    <div className="App">
      <BrowserRouter>
        <Header/>

        <main>
          <section className="App-article">
            <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                {/* <Route path="/" element={<Expenses setEditPurchase={setEditPurchase}/>} />  */}
                <Route path="/budgee" element={<BudgeePage/>} /> 
                <Route path="/login" element={<LogIn/>} /> 
                <Route path="/register" element={<Register/>} /> 
                <Route path="/" element={<Home setEditPurchase={setEditPurchase} categories={categories}/>} /> 
                <Route path="/create-purchase" element={<CreatePage />} /> 
                <Route path="/edit-purchase/:id" element={<EditPage purchase={purchase} categories={categories}/>} /> 
                <Route path="/edit-budget/:id" element={<BudgetEditPage categories={categories}/>} /> 
                <Route path="*" element={<ErrorPage/>}/>

            </Routes>
          </section>
        </main>
        <Footer/>
        </BrowserRouter>
      </div>
    );
  }

export default App;