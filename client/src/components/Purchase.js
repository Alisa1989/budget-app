import React from "react";
import { MdOutlineEditNote } from 'react-icons/md';
import BasicPopover from "./BasicPopover";
import { useNavigate } from "react-router-dom";

function Purchase({ purchase, onEdit}) {

    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/edit-purchase/${purchase._id}`);
    }

    return (
        <tr key={purchase._id}>
            <td title="Click to edit this purchase"><MdOutlineEditNote onClick={() => handleEdit()} /></td>
            <td title="The name of the object or service you bought">{purchase.name}</td>
            <td title="How much did you pay?">${purchase.price}</td>
            <td title="Notes">{purchase.notes}</td>
            <td title="When did you make the purchase?">{purchase.date.slice(0,10)}</td>
            <td title="Category?">{(purchase.category).charAt(0).toUpperCase() + purchase.category.slice(1)}</td>
            <td title="Is this a recurring purchase?"> {purchase.recurring === true ? "Yes" : "No" }</td>
            <td title="Click to delete this purchase.">
                <BasicPopover 
                    item={purchase}
                    // onDelete={onDelete}
                />
                </td>
        </tr>
    );
}

export default Purchase;