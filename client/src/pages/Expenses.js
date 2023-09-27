import React, { useEffect, useState } from "react";
import PurchaseList from "../components/PurchaseList";
import { useNavigate } from "react-router-dom";

function Expenses({ setEditPurchase, expenses }) {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        setPurchases(expenses);
    }, [expenses])
    
    const navigate = useNavigate();

    // UPDATE a single purchase
    const onEditPurchase = async purchase => {
        setEditPurchase(purchase);
        navigate("/edit-purchase");
    }

    // DELETE a single purchase
    const onDeletePurchase = async _id => {
        const response = await fetch(`/log/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/log');
            const purchases = await getResponse.json();
            setPurchases(purchases)
        } else {
            console.error(`Failed to delete purchase with id = ${_id}, status code = ${response.status}`)
        }
    }

    return(
        <div >
            <h2>List of Purchases</h2>
            <p>These are my most recent purchases</p>
            <PurchaseList
                purchases={purchases}
                onEdit={onEditPurchase}
                onDelete={onDeletePurchase}
            />
            <button className="action-button" onClick={()=>navigate('/create-purchase')}>Add Purchase</button>
        </div>
    )

}

export default Expenses;
