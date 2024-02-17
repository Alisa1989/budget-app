import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import expenseService from './ExpenseService'

const initialState = {
    expenses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createExpense = createAsyncThunk('api/invoices', async(expenseData, thunkAPI) => {
    console.log("thunk API in create", thunkAPI)
    try {
        const token = thunkAPI.getState().auth.user.token
        return await expenseService.createExpense(expenseData, token)
    } catch (error) {
        const message = 
        (error.response &&
             error.response.data &&
              error.response.data.message) || 
              error.message || 
              error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get user expenses
export const getExpenses = createAsyncThunk('api/invoices/getAll', async(_, thunkAPI) =>
{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await expenseService.getExpenses(token)
    } catch (error) {
        const message = 
        (error.response &&
             error.response.data &&
              error.response.data.message) || 
              error.message || 
              error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update expense
export const updateExpense = createAsyncThunk('api/invoices/update', async({id, expenseData}, thunkAPI) =>
{
    console.log("update expnese in expense slice being called", id, "and", expenseData)
    try {
        console.log("thunkAPI", thunkAPI)
        const token = thunkAPI.getState().auth.user.token
        console.log("token in Slice: ", token)
        return await expenseService.updateExpense(id, expenseData, token)
    } catch (error) {
        console.error(error)
        const message = 
        (error.response &&
             error.response.data &&
              error.response.data.message) || 
              error.message || 
              error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete expense
export const deleteExpense = createAsyncThunk('api/invoices/delete', async(id, thunkAPI) =>
{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await expenseService.deleteExpense(id, token)
    } catch (error) {
        const message = 
        (error.response &&
             error.response.data &&
              error.response.data.message) || 
              error.message || 
              error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createExpense.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.expenses.push(action.payload)
            })
            .addCase(createExpense.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getExpenses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.expenses = action.payload
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteExpense.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // need to filter so it can be removed from the UI right when we delete it
                state.expenses = state.expenses.filter((expense) => expense._id !== action.payload.id)
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateExpense.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const matchingIndex = state.expenses.findIndex((entry)=> entry._id === action.payload._id)
                state.expenses[matchingIndex] = action.payload
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = expenseSlice.actions
export default expenseSlice.reducer