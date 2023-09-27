import React, { useEffect, useState } from "react";


const Budgets = ({budgets}) => {
    const [budgetList, setBudgetList] = useState([]);


    useEffect(() => {
        setBudgetList(budgets);
    }, [budgets])

  return (
    <div>
        <div>Budgets</div>
        {budgetList.map((item, index) =>{
            return (<div>
                <p>SUP</p>
                <p>Category: {item.category}</p>
                <p>Amount: {item.amount}</p>
            </div>)
        })}
    </div>
  )
}

export default Budgets