import React, { useEffect, useState } from "react";
import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";
import CreateBudget from "../components/CreateBudget";

const Budgets = ({budgets}) => {
    const [budgetList, setBudgetList] = useState([]);


    useEffect(() => {
        setBudgetList(budgets);
        console.log("budgets", budgets);
    }, [budgets])

  return (
    <div>
        <BasicModal
                title= "Budgets"
                buttonIcon= {<FcInfo />}
                modalTitle="Budgets"
                description="Budgets allow you to set your spending goals. You can Add, Modify, or delete a budget."
                />
        <button>Edit Budgets</button>
        {budgetList.map((item, index) =>{
            return (
            <div key={index}>
                <p>Category: {item.category}</p>
                <p>Amount: {item.amount}</p>
            </div>
            )
        })}
        <CreateBudget />
    </div>
  )
}

export default Budgets