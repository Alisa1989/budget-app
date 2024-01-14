const mongoose = require('mongoose');


const budgetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: { type: String, required: true},
    amount: { type: Number, default: 0 }
})

const Budget = mongoose.model("Budget", budgetSchema);

// BUDGET 
const createBudget = async ( amount, category, user) =>{
    const budget = new Budget({
        amount: amount, 
        category: category,
        user: user._id
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
