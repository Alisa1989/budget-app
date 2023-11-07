const mongoose = require('mongoose');


const budgetSchema = mongoose.Schema({
    category: { type: String, required: true},
    amount: { type: Number, default: 0 }
})

const Budget = mongoose.model("Budget", budgetSchema);

// BUDGET 
const createBudget = async ( amount, category) =>{
    const budget = new Budget({
        amount: amount, 
        category: category,
    });
    return budget.save();
}

// Find
const findBudget = async(filter) => {
    return Budget.find(filter);
    // return query.exec();
}

// Update
const updateBudget = async (category, amount) => {
    await Budget.replaceOne(category, {
        amount: amount
    });
    return {
        amount: amount
    }
}

module.exports = {createBudget, findBudget, updateBudget};
