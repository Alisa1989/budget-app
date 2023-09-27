import React, { useState } from 'react';

function CreateBudget() {
    const [budget, setBudget] = useState({
        category: "",
        amount: ""
    })

    const addBudget = async() => {
        const response = await fetch('/budgets', {
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
        <>
            <div>CreateBudget</div>
            <form onSubmit={addBudget}>
                <label htmlFor="">
                    category
                    <input
                    type="text"
                    id="category"
                    name="category"
                    value={budget.category}
                    onChange={onChange}
                    autoFocus
                    />
                </label>
                <label htmlFor="">
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
                <button>Add Budget</button>
            </form>
        </>
    )
}

export default CreateBudget