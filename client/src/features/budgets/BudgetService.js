import axios from "axios";

const API_URL = "/api/budgets/";

// create new budget
const createBudget = async (budgetData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.post(API_URL, budgetData, config)

    return response.data
}

// get user budgets
const getBudgets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config)

    return response.data
}

// update user budget
const updateBudget = async (budgetId, budgetData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(API_URL + budgetId, budgetData, config)
        return response.data
    } catch (error) {
        console.error('Error updating: ', error.response)
    }
}

// delete user budget
const deleteBudget = async (budgetId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + budgetId, config)
    return response.data
}

const budgetService = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
}

export default budgetService