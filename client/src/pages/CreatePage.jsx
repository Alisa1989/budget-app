import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { createExpense } from '../features/expenses/ExpenseSlice';
import Button from '@mui/material/Button';


function CreatePage({categories}) {
  const [purchase, setPurchase] = useState({
    name: "",
    price: "",
    notes: "",
    date: "",
    category: "",
    recurring: false,
  });

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

  const onChange = (e) => {
    e.persist();
    const newFormData = {
      ...purchase,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    setPurchase(newFormData);
  };

  return (
    <div >
        <h3>Add an Expense to the table</h3>
        <form className ="form-container">
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
                  {categories && categories.map((cat) => {
                    return <option value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  })}
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
          </form>
    </div>
  );
}

export default CreatePage;
