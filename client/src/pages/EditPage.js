import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


// function EditPage() {
const EditPage = ({ purchase }) => {
    const [purchaseEdit, setPurchaseEdit] = useState({
        name: purchase.name,
        price: purchase.price,
        date: purchase.date.slice(0,10)
    })

const navigate = useNavigate();

const editPurchase = async () => {

    const response = await fetch(`/log/${purchase._id}`, {
        method: 'PUT',
        body: JSON.stringify(purchaseEdit),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 200) {
        alert("Your purchase was modified succesfully.")
    } else {
        const errMessage = await response.json();
        alert(`Failed to modify purchase. Status ${response.status}. ${errMessage}.`)
    }
    navigate("/budget")
};


const onChange = (e) => {
    e.persist();
    const newFormData = {
      ...purchaseEdit,
      [e.target.name]: e.target.type ==="date" ? e.target.value.slice(0,10) : e.target.value,
    };
    setPurchaseEdit(newFormData);
  };

    return(
        <>
            <h2>Log a Purchase</h2>
            <p>What did you buy today?</p>
            <table id="purchases">
                <caption>Add a purchase to the table</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Date</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name" >
                            <input 
                            type="text" 
                            id="name" 
                            name="name"
                            placeholder="what was it?"
                            value={purchaseEdit.name ?? ""} 
                            onChange={onChange}
                            autoFocus
                            />
                        </label>
                        </td>
                        <td><label htmlFor="price" >
                            <input 
                            type="text" 
                            id="price" 
                            name="price"
                            placeholder="0"
                            value={purchaseEdit.price ?? ""} 
                            onChange={onChange}
                            />
                        </label></td>
                        <td><label htmlFor="date" >
                            <input 
                            type="date" 
                            id="date" 
                            name="date"
                            placeholder={Date.now()}
                            value={purchaseEdit.date ?? ""} 
                            onChange={onChange}
                            pattern="\d{2}-\d{2}-\d{2}"
                            />
                        </label>
                        </td>
                        <td><button className="wait" onClick={editPurchase}>Update</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};
export default EditPage;