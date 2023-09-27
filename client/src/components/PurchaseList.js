import React from "react";
import Purchase from "./Purchase";

function PurchaseList({ purchases, onDelete, onEdit}) {
    return (
        <>
            <table id="purchases">
                <caption>Add and Edit Purchases</caption>
                <thead>
                    <tr>
                        <th>Edit</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Notes</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Recurring</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase, i) => 
                        <Purchase 
                        onEdit={onEdit} 
                        purchase={purchase} 
                        key={i}
                        onDelete={onDelete}
                        />)}
                </tbody>
            </table>
        </>
    )
}

export default PurchaseList;