import axios from "axios";

const API_URL = "/api/invoices/";

// create new expense
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, expenseData, config)

  return response.data
};

// get user expenses
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config)

  return response.data
};

// update user expense
const updateExpense = async (expenseId, expenseData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.put(API_URL + expenseId, expenseData, config)
      console.log('Expense service response', response);
      return response.data
    } catch (error) {
      console.error('Error updating: ', error.response);
    }
  
  };

// delete user expense
const deleteExpense = async (expenseId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.delete(API_URL + expenseId, config)
  
    return response.data
  };

const expenseService = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}

export default expenseService