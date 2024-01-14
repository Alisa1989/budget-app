import React, { useState } from 'react';

function CreateBudget() {
    const [budget, setBudget] = useState({
        category: "",
        amount: ""
    })

    const addBudget = async() => {
        const response = await fetch('/api/budgets', {
            method: 'POST',
            body: JSON.stringify(budget),
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Your budget was succesfully added.")
        } else {
            alert("Failed to add a row, check that all fields are present")
        }

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
        <div>
            <div>CreateBudget</div>
            <form onSubmit={addBudget}>
                <label htmlFor="category">
                    category
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
                <button title="Add Budget">Add Budget</button>
            </form>
        </div>
    )
}

export default CreateBudget