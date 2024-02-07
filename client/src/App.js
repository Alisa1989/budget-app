import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import HomePage from './pages/HomePage';
// import Expenses from './pages/Expenses';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';
import BudgeePage from './pages/BudgeePage';

import './App.css';

function App() {

  const [purchase, setEditPurchase] = useState([])

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
                <Route path="/" element={<Home setEditPurchase={setEditPurchase}/>} /> 
                <Route path="/create-purchase" element={<CreatePage />} /> 
                <Route path="/edit-purchase/:id" element={<EditPage purchase={purchase}/>} /> 
                <Route path="*" element={<ErrorPage/>}/>

            </Routes>
          </section>
        </main>
        
        </BrowserRouter>
      </div>
    );
  }

export default App;