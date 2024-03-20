import React, { useState, useMemo } from "react";
import Purchase from "./Purchase";

function ExpenseTable({ expenses, onEdit }) {
  const [sortingParameters, setSortingParameters] = useState(null); // stores object with sort key and direction

  //useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
  const calculation = useMemo(() => {
    let sortedExpenses = [...expenses];
    if (sortingParameters !== null) {
      sortedExpenses.sort((a, b) => {
        if (a[sortingParameters.key] < b[sortingParameters.key]) {
          return sortingParameters.direction === "ascending" ? -1 : 1;
        }
        if (a[sortingParameters.key] > b[sortingParameters.key]) {
          return sortingParameters.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedExpenses;
  }, [expenses, sortingParameters]);

  const changeSort = (key) => {
    let direction = "ascending";
    if (
        sortingParameters && sortingParameters.key === key &&
      sortingParameters.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortingParameters({ key, direction });
  };

  return (
    <table className="expenses-table">
      <thead>
        <tr>
          <th>Edit</th>
          <th>
            <button type="button" onClick={() => changeSort("name")}>
            Name
          </button>
            </th>
          <th>
            <button type="button" onClick={() => changeSort("price")}>
            Price
          </button>
            </th>
            <th>Notes</th>
          <th>
            <button type="button" onClick={() => changeSort("date")}>
            Date
          </button>
            </th>
          <th>
            <button type="button" onClick={() => changeSort("category")}>
            Category
          </button>
            </th>
          {/* <th>Recurring</th> */}
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {calculation.map((purchase, i) => (
          <Purchase onEdit={onEdit} purchase={purchase} key={i} />
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;
