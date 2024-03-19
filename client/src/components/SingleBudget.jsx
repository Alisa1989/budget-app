import React from "react";
import { MdOutlineEditNote } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import BasicPopover from "./BasicPopover";
import { useDispatch } from 'react-redux';
import { deleteBudget } from "../features/budgets/BudgetSlice";


function SingleBudget({ item, index, currentMonthExpenses }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = () => {
      navigate(`/edit-budget/${item._id}`);
  }
    const budgetDeletion = (id) => {
      dispatch(deleteBudget(id))
  }

  const progressThresholds = [
    {
      upperLimit: 0.5,
      color: "limegreen"
    },
    {
      upperLimit: 0.75,
      color: "gold"
    },
    {
      upperLimit: 1,
      color: "red"
    }
  ];

  let value = 0
  if (currentMonthExpenses){
    value = currentMonthExpenses[item.category] || 0
  } else {
    value = 0
  }

  return (
    <div key={index} className="single-budget-frame">
      <span title="Click to edit this budget">
        <MdOutlineEditNote onClick={() => handleEdit()} className="icon-modify"/>
      </span>
      <div className="single-budget">
        <label htmlFor="file">{item.category}</label>
        <progress
          className="progress-bar"
          id="file"
          title={`${value} of ${item.amount}`}
          max={item.amount}
          value={value > item.amount ? (value = item.amount) : value}
          style={{
            "--progress-color": progressThresholds.find(
              ({ upperLimit }) => upperLimit >= value / item.amount
            )?.color,
          }}
        >
          {value || 0}%
        </progress>
      </div>
      <span title="Click to delete this budget.">
        <BasicPopover item={item} handleDeletion={budgetDeletion} />
      </span>
    </div>
  );
}

export default SingleBudget;
