import React from "react";
import { MdOutlineEditNote } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import BasicPopover from "./BasicPopover";


function SingleBudget({ item, index, groupedExpenses }) {
    console.log("item in singleBudget", item)
    
    const navigate = useNavigate();
    const handleEdit = () => {
      navigate(`/edit-budget/${item._id}`);
  }
  return (
    <div key={index} className="single-budget-frame">
                  <span title="Click to edit this budget"><MdOutlineEditNote onClick={() => handleEdit()} /></span>
      <div className="single-budget">

      <label htmlFor="file">{item.category}</label>
      <progress
        id="file"
        max={item.amount}
        value={groupedExpenses[item.category] || 0}
        >
        {groupedExpenses[item.category] || 0}%
      </progress>
      </div>
      {/* {console.log("max", item.amount, "value", groupedExpenses[item.category])} */}
      <span title="Click to delete this budget.">
        <BasicPopover 
          item = {item}
        />
      </span>
    </div>
  );
}

export default SingleBudget;
