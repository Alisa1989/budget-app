import React from "react";
import BasicModal from "../components/BasicModal";
import { FcInfo } from "react-icons/fc";
import CreateBudget from "../components/CreateBudget";

const Budgets = ({budgets, groupedExpenses}) => {

  return (
    <div>
        <BasicModal
                title= "Budgets"
                buttonIcon= {<FcInfo />}
                modalTitle="Budgets"
                description="Budgets allow you to set your spending goals. You can Add, Modify, or delete a budget."
                />
        <button>Edit Budgets</button>
        {budgets.map((item, index) =>{
            return (

                <div key={index}>
                    <label for="file">{item.category}</label>

                    <progress id="file" max={item.amount} value={groupedExpenses[item.category] || 0 }>{groupedExpenses[item.category] || 0 }%</progress>
                {console.log("max", item.amount, "value", groupedExpenses[item.category])}
            </div>
            )
        })}
        <CreateBudget />
    </div>
  )
}

export default Budgets