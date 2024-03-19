import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { createBudget } from '../features/budgets/BudgetSlice';
import { Button } from '@mui/material';

function CreateBudget({categories}) {
    const [budget, setBudget] = useState({
        category: "",
        amount: ""
    })

    const dispatch = useDispatch();

    const addBudget = async() => {
        dispatch(createBudget(budget))
        setBudget({
            category: "",
            amount: ""
        })
    }

    const onChange = (e) => {
        e.persist();
        const newFormData = {
            ...budget,
            [e.target.name]: e.target.value
        };
        setBudget(newFormData);
      };

    return (
        <div>
            <h3>Add a budget</h3>
            <form className='form-container'>
                <label htmlFor="category">
                    Category
                    <select
                        name="category"
                        id="category"
                        value={budget.category ?? ""}
                        onChange={onChange}
                        autoFocus
                    >
                        <option value="">--Please choose an option--</option>
                        {categories && categories.map((cat, index) => {
                    return <option value={cat} key={index}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  })}
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
                <Button title="Add Budget" className="wait add-budget-button" variant="contained" size="small" onClick={addBudget}>Add </Button>
            </form>
        </div>
    )
}

export default CreateBudget