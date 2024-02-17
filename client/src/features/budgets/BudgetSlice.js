import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import budgetService from './BudgetService'

    const initialState = {
    budgets: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createBudget = createAsyncThunk( 'api/budgets', async (budgetData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await budgetService.createBudget(budgetData, token)
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

export const getBudgets = createAsyncThunk( 'api/budgets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await budgetService.getBudgets(token)
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

export const updateBudget = createAsyncThunk('api/budgets/update', async ({id, budgetData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await budgetService.updateBudget(id, budgetData, token)
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

export const budgetSlice = createSlice({
    name: 'budget',
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
        .addCase(createBudget.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createBudget.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.budgets.push(action.payload)
        })
        .addCase(createBudget.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getBudgets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBudgets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.budgets = action.payload
        })
        .addCase(getBudgets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateBudget.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateBudget.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            const matchingIndex = state.budgets.findIndex((entry)=> entry._id === action.payload._id)
            state.budgets[matchingIndex] = action.payload
        })
        .addCase(updateBudget.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
}
})

export const {reset} = budgetSlice.actions
export default budgetSlice.reducer