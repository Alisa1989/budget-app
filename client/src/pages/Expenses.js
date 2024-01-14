import React from "react";
import PurchaseList from "../components/PurchaseList";
import { useNavigate } from "react-router-dom";
import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";

function Expenses({ setEditPurchase, expenses, setExpenses }) { 
    const navigate = useNavigate();

    // UPDATE a single purchase
    const onEditPurchase = async purchase => {
        console.log("purchase", purchase);
        setEditPurchase(purchase);
        navigate("/edit-purchase");
    }

    // DELETE a single purchase
    const onDeletePurchase = async _id => {
        const response = await fetch(`/api/invoices/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/api/invoices');
            const purchases = await getResponse.json();
            setExpenses(purchases)
        } else {
            console.error(`Failed to delete purchase with id = ${_id}, status code = ${response.status}`)
        }
    }

    return(
        <div >
            <BasicModal
                title= "List of Expenses"
                buttonIcon= {<FcInfo />}
                modalTitle="The List of Purchases"
                description="Contains all your purchases. You can Add, Modify, or delete a purchase."
                />
            <p>These are my most recent purchases</p>
            <PurchaseList
                purchases={expenses}
                onEdit={onEditPurchase}
                onDelete={onDeletePurchase}
            />
            <button title="Add Purchase" className="action-button" onClick={()=>navigate('/create-purchase')}>Add Purchase</button>
        </div>
    )

}

export default Expenses;
