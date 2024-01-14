import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [purchase, setPurchase] = useState({
    name: "",
    price: "",
    notes: "",
    date: "",
    category: "",
    recurring: false,
  });

  const navigate = useNavigate();

  const addPurchase = async () => {
     
    const response = await fetch("/api/invoices", {
      method: "POST",
      body: JSON.stringify(Math.round(purchase * 100) / 100),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      alert("Your purchase was succesfully added.");
    } else {
      alert("Failed to add a row, check that all fields are present");
    }
    navigate("/");
  };

  const onChange = (e) => {
    e.persist();
    // console.log("input changed!", e.target.value);
    const newFormData = {
      ...purchase,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
      // [e.target.name]: e.target.value
    };
    // console.log("newFormData", newFormData);
    setPurchase(newFormData);
  };

  return (
    <>
      <h2>Log a Purchase</h2>
      <p>What did you buy today?</p>
      <table id="purchases">
        <caption>Add a purchase to the table</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Category</th>
            <th>Recurring</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="name">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="what was it?"
                  value={purchase.name ?? ""}
                  onChange={onChange}
                  autoFocus
                />
              </label>
            </td>
            <td>
              <label htmlFor="price">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  value={purchase.price ?? ""}
                  onChange={onChange}
                />
              </label>
            </td>
            <td>
              <label htmlFor="notes">
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  placeholder="any notes?"
                  value={purchase.notes ?? ""}
                  onChange={onChange}
                />
              </label>
            </td>
            <td>
              <label htmlFor="date">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder={Date.now()}
                  value={purchase.date ?? ""}
                  onChange={onChange}
                  pattern="\d{2}-\d{2}-\d{2}"
                />
              </label>
            </td>
            <td>
              <label htmlFor="category">
                <select
                  name="category"
                  id="category"
                  value={purchase.category ?? ""}
                  onChange={onChange}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="rent">Rent</option>
                  <option value="food">Food</option>
                  <option value="cars">Cars</option>
                  <option value="house">House</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="theia">Theia</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </td>
            <td>
              <label htmlFor="recurring">
                <input
                  type="checkbox"
                  id="recurring"
                  name="recurring"
                  checked={purchase.recurring}
                  onChange={onChange}
                />
              </label>
            </td>
            <td>
              <button title="Add Purchase" className="wait" onClick={addPurchase}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default CreatePage;
