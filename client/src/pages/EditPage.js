import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { updateExpense } from '../features/expenses/ExpenseSlice';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const EditPage = () => {
    const paramsId = useParams();
    
    const { expenses, message } = useSelector((state) => state.expenses);
    console.log("expenses", expenses)
    console.log("params", paramsId.id);
    const purchase = expenses.find(item => Number(paramsId.id === item._id));
    
    console.log("purchase", purchase)

    const [purchaseEdit, setPurchaseEdit] = useState({
        name: purchase.name,
        price: purchase.price,
        notes: purchase.notes,
        date: purchase.date.slice(0,10),
        category: purchase.category,
        recurring: purchase.recurring
    })

const navigate = useNavigate();
const dispatch = useDispatch();

const editPurchase = async () => {
    console.log("in edit purchase", purchaseEdit)

    // const response = await fetch(`/api/invoices/${purchase._id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(Math.round(purchaseEdit * 100) / 100),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });
    // if (response.status === 200) {
    //     alert("Your purchase was modified succesfully.")
    // } else {
    //     const errMessage = await response.json();
    //     alert(`Failed to modify purchase. Status ${response.status}. ${errMessage}.`)
    // }
    dispatch(updateExpense(purchase._id, purchaseEdit))
    navigate("/")
};


const onChange = (e) => {
    // console.log("date", purchase.date)
    // console.log(e.target.name, e.target.value)
    e.persist();
    const newFormData = {
        ...purchase,
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        
    };
    // console.log("newFormData", newFormData)
    setPurchaseEdit(newFormData);
  };

    return(
        <>
            <h2>Modify Invoice</h2>
            {/* <p>What did you buy today?</p> */}
            <table id="purchases">
                <caption>Add a purchase to the table</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Notes</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Recurring</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name">
                            <input 
                            type="text" 
                            id="name" 
                            name="name"
                            placeholder="what was it?"
                            value={purchaseEdit.name} 
                            onChange={onChange}
                            autoFocus
                            />
                        </label>
                        </td>
                        <td><label htmlFor="price">
                            <input 
                            type="text" 
                            id="price" 
                            name="price"
                            placeholder="0.00" 
                            step="0.01"
                            value={purchaseEdit.price} 
                            onChange={onChange}
                            />
                        </label></td>
                        <td>
                            <label htmlFor="notes">
                            <input 
                            type="text" 
                            id="notes" 
                            name="notes"
                            placeholder="any notes?"
                            value={purchaseEdit.notes} 
                            onChange={onChange}
                            />
                        </label>
                        </td>
                        <td>
                            <label htmlFor="date">
                            <input 
                            type="date" 
                            id="date" 
                            name="date"
                            value={purchaseEdit.date.slice(0,10)} 
                            onChange={onChange}
                            pattern="\d{2}-\d{2}-\d{2}"
                            />
                        </label>
                        </td>
                        <td>
                            <label htmlFor="category">
                            <select
                                name="category"
                                id="category"
                                value={purchase.category}
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
                        </td>
                        {/* <td>
                            <label htmlFor="recurring">
                            <input 
                            type="checkbox" 
                            id="recurring" 
                            name="recurring"
                            checked={purchaseEdit.recurring}
                            onChange={onChange}
                            />
                        </label>
                        </td> */}
                        <td><button title="Confirm Changes" className="wait" onClick={editPurchase}>Modify</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};
export default EditPage;