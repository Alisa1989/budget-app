import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateBudget } from "../features/budgets/BudgetSlice";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

function BudgetEditPage({categories}) {
    const paramsId = useParams()
    const { budgets} = useSelector((state) => state.budgets);
    const budget = budgets.find(item => Number(paramsId.id === item._id))
    
    const [budgetEdit, setBudgetEdit] = useState({
        amount: budget.amount,
        category: budget.category,
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const editbudget = async () => {
        await dispatch(updateBudget({id: budget._id, budgetData: budgetEdit}))
        navigate("/")
    };


    const onChange = (e) => {
        e.persist();
        const newFormData = {
            ...budgetEdit,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
            
        };
        setBudgetEdit(newFormData);
    };

    return(
        <table className="table-modify" id="budgets">
            <caption><h2>Modify Invoice</h2></caption>
            <thead>
            <tr>
                <th>Amount</th>
                <th>Category</th>
            </tr>
        </thead>
            <tbody>
                <tr>
                    <td><label htmlFor="amount">
                        <input 
                        type="text" 
                        id="amount" 
                        name="amount"
                        placeholder="0.00" 
                        step="0.01"
                        value={budgetEdit.amount} 
                        onChange={onChange}
                        />
                    </label></td>
                    <td>
                        <label htmlFor="category">
                        <select
                            name="category"
                            id="category"
                            value={budgetEdit.category}
                            onChange={onChange}
                        >
                            <option value="">--Please choose an option--</option>
                            {categories && categories.map((cat, index) => {
                                return <option value={cat} key={index}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            })}
                        </select>
                        </label>
                    </td>
                    <td><Button title="Confirm Changes" className="wait modify" variant="contained" size="large" onClick={editbudget}>Modify</Button></td>
                </tr>
            </tbody>
        </table>
    )
}

export default BudgetEditPage