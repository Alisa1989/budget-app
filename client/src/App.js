import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LuBird } from 'react-icons/lu' 

// import HomePage from './pages/HomePage';
// import Expenses from './pages/Expenses';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

import './App.css';

function App() {

  const [purchase, setEditPurchase] = useState([])

  return (
    
    <div className="App">
      <BrowserRouter>

        <header className="App-header">
          <h1> 
            <LuBird/>
            Budgee 
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
          </h1>
        </header>

        <main>
          <section className="App-article">
            <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                {/* <Route path="/" element={<Expenses setEditPurchase={setEditPurchase}/>} />  */}
                <Route path="/signin" element={<SignIn/>} /> 
                <Route path="/" element={<Home setEditPurchase={setEditPurchase}/>} /> 
                <Route path="/create-purchase" element={<CreatePage />} /> 
                <Route path="/edit-purchase" element={<EditPage purchase={purchase}/>} /> 

            </Routes>
          </section>
        </main>
        
        </BrowserRouter>
      </div>
    );
  }

export default App;