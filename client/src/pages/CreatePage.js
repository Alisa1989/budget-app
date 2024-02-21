import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { createExpense } from '../features/expenses/ExpenseSlice';
import Button from '@mui/material/Button';


function CreatePage() {
  const [purchase, setPurchase] = useState({
    name: "",
    price: "",
    notes: "",
    date: "",
    category: "",
    recurring: false,
  });

  // const navigate = useNavigate();
  const dispatch = useDispatch();


  const addPurchase = async () => {
    dispatch(createExpense(purchase))
    setPurchase({
      name: "",
      price: "",
      notes: "",
      date: "",
      category: "",
      recurring: false,
    })
  }

  // const addPurchase = async () => {
     
  //   const response = await fetch("/api/invoices", {
  //     method: "POST",
  //     body: JSON.stringify(Math.round(purchase * 100) / 100),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (response.status === 201) {
  //     alert("Your purchase was succesfully added.");
  //   } else {
  //     alert("Failed to add a row, check that all fields are present");
  //   }
  //   navigate("/");
  // };

  const onChange = (e) => {
    e.persist();
    // console.log("input changed!", e.target.value);
    const newFormData = {
      ...purchase,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
      // [e.target.name]: e.target.value
    };
    // console.log("newFormData", newFormData);
    setPurchase(newFormData);
  };

  return (
    <div className ="form-container">
        <h3>Add an Expense to the table</h3>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="what was it?"
                  value={purchase.name ?? ""}
                  onChange={onChange}
                  autoFocus
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  value={purchase.price ?? ""}
                  onChange={onChange}
                />
              </label>
              <label htmlFor="notes">
                Notes
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  placeholder="any notes?"
                  value={purchase.notes ?? ""}
                  onChange={onChange}
                />
              </label>
              <label htmlFor="date">
                Date
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder={Date.now()}
                  value={purchase.date ?? ""}
                  onChange={onChange}
                  pattern="\d{2}-\d{2}-\d{2}"
                />
              </label>
              <label htmlFor="category">
                Category
                <select
                  name="category"
                  id="category"
                  value={purchase.category ?? ""}
                  onChange={onChange}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="rent">Rent</option>
                  <option value="food">Food</option>
                  <option value="cars">Cars</option>
                  <option value="house">House</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="theia">Theia</option>
                  <option value="other">Other</option>
                </select>
              </label>
              {/* <label htmlFor="recurring">
                Recurring
                <input
                  type="checkbox"
                  id="recurring"
                  name="recurring"
                  checked={purchase.recurring}
                  onChange={onChange}
                />
              </label> */}
              <Button title="Add Purchase" className="wait add-expense-button" variant="contained" size="large" onClick={addPurchase}>
                Add
              </Button>
    </div>
  );
}

export default CreatePage;
