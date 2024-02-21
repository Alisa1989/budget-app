import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { createBudget } from '../features/budgets/BudgetSlice';
import { Button } from '@mui/material';

function CreateBudget() {
    const [budget, setBudget] = useState({
        category: "",
        amount: ""
    })

    const dispatch = useDispatch();

    const addBudget = async() => {
        console.log("form budget", budget)
        dispatch(createBudget(budget))
        setBudget({
            category: "",
            amount: ""
        })
    }

    const onChange = (e) => {
        e.persist();
        // console.log("input changed!", e.target.value);
        const newFormData = {
            ...budget,
            [e.target.name]: e.target.value
        };
        // console.log("newFormData", newFormData);
        setBudget(newFormData);
      };


    return (
        <div className='form-container'>
            <h3>To add a budget</h3>
            <form onSubmit={addBudget}>
                <label htmlFor="category">
                    Select a Category
                    <select
                        name="category"
                        id="category"
                        value={budget.category ?? ""}
                        onChange={onChange}
                        autoFocus
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
                <label htmlFor="amount">
                    amount
                    <input
                    type="text"
                    id="amount"
                    name="amount"
                    step="1"
                    value={budget.price}
                    onChange={onChange}
                    />
                </label>
                <Button title="Add Budget" className="wait" variant="contained" size="small" onClick={addBudget}>Add Budget</Button>
            </form>
        </div>
    )
}

export default CreateBudget