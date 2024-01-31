import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/AuthSlice'
import expenseReducer from '../features/expenses/ExpenseSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer
    },
})