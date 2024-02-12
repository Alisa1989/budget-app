const mongoose = require('mongoose');


const budgetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        // unique: false 
    },
    category: { 
        type: String, 
        required: true,
        // unique: false 
    },
    amount: { 
        type: Number, 
        default: 0,
        // unique: false 
    }
},
{
  timestamps: true,
})

// unique compound index so you can make a combination of fields unique
budgetSchema.index({user: 1, category: 1}, {unique: true})

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
    const query = Budget.find(filter);
    return query.exec();
}

const findById = async(id) => {
    const query = Budget.findById(id);
    return query.exec();
}

// Update
const updateBudget = async ({category}, {amount, user}) => {
    result = await Budget.replaceOne({category: category}, {
        user: user,
        category: category,
        amount: amount
    });
    return {
        user: user,
        category: category,
        amount: amount
    }
}

module.exports = {createBudget, findBudget, findById, updateBudget};
