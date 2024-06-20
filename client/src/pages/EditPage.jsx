import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { updateExpense } from '../features/expenses/ExpenseSlice';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { Container } from "@mui/material";



const EditPage = ({categories}) => {
    const paramsId = useParams();
    
    const { expenses } = useSelector((state) => state.expenses);
    const purchase = expenses.find(item => Number(paramsId.id === item._id));
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
    await dispatch(updateExpense({id: purchase._id, expenseData: purchaseEdit}))
    navigate("/")
};


const onChange = (e) => {
    e.persist();
    const newFormData = {
        ...purchaseEdit,
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        
    };
    setPurchaseEdit(newFormData);
    console.log(newFormData);
  };

    return(
        <Container>

        <table className="table-modify" id="purchases">
            <caption> <h2>Modify Invoice</h2></caption>
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
                        value={purchaseEdit.category}
                        onChange={onChange}
                        >
                        <option value="">--Please choose an option--</option>
                        {categories && categories.map((cat) => {
                            return <option value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        })}
                    </select>
                    </label>
                </td>
                {/* <td>
                    <input 
                    type="checkbox" 
                    id="recurring" 
                    name="recurring"
                    checked={purchaseEdit.recurring}
                    onChange={onChange}
                    />
                    </label>
                </td> */}
                <td><Button title="Confirm Changes" className="wait modify" variant="contained" size="large" onClick={editPurchase}>Modify</Button></td>
            </tr>
        </tbody>
        </table>
                </Container>
    )
};
export default EditPage;