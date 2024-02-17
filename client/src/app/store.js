import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/AuthSlice'
import expenseReducer from '../features/expenses/ExpenseSlice'
import budgetReducer from '../features/budgets/BudgetSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer,
        budgets: budgetReducer
    },
})