import React from "react";
import { MdOutlineDeleteForever, MdOutlineEditNote } from 'react-icons/md';


function Purchase({ purchase, onEdit, onDelete }) {
    // console.log("purchase category", purchase.category)
    return (
        <tr>
            <td><MdOutlineEditNote onClick={() => onEdit(purchase)} title="Click to edit this purchase"/></td>
            <td title="The name of the object or service you bought">{purchase.name}</td>
            <td title="How much did you pay?">${purchase.price}</td>
            <td title="Notes">{purchase.notes}</td>
            <td title="When did you make the purchase?">{purchase.date.slice(0,10)}</td>
            <td title="Category?">{(purchase.category).charAt(0).toUpperCase() + purchase.category.slice(1)}</td>
            <td title="Is this a recurring purchase?"> {purchase.recurring === true ? "Yes" : "No" }</td>
            <td title="Click to delete this purchase."><MdOutlineDeleteForever onClick={() => onDelete(purchase._id)} /></td>
        </tr>
    );
}

export default Purchase;