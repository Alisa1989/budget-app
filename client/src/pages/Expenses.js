import React from "react";
import ExpenseTable from "../components/ExpenseTable";
import { useNavigate } from "react-router-dom";
import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";
// import { UseSelector, UseDispatch } from "react-redux";

function Expenses({ setEditPurchase, expenses, setExpenses }) { 
    const navigate = useNavigate();


    // const dispatch = UseDispatch()

    // UPDATE a single purchase
    const onEditPurchase = async purchase => {
        // console.log("purchase", purchase);
        // setEditPurchase(purchase);
        navigate("/edit-purchase");
    }

    return(
        <div>
            <BasicModal
                title= "List of Expenses"
                buttonIcon= {<FcInfo />}
                modalTitle="The List of Purchases"
                description="Contains all your purchases. You can Add, Modify, or delete a purchase."
                />
            {expenses.length > 0 ? 
            (
                <ExpenseTable
                expenses={expenses}
                onEdit={onEditPurchase}
                />
            ) : (<h3>You haven't recorded any expense</h3>)}
        </div>
    )

}

export default Expenses;
