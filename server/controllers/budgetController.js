const asyncHandler = require('express-async-handler');
const Budget = require('../models/budgetModel');


// Create ----------------------
const createBudget = ( req, res) => {
    Budget.createBudget(
        req.body.amount,
        req.body.category,
        req.user
        )
    .then((budget) => {
        res.status(201).json(budget);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({ error: "Creation of a budget document failed, check your syntax." });
    });
};

// Retrieve ----------------
function budgetFilter(req) {
    let filter = {};
    if (req.body.category !== undefined) {
        filter.category = req.body.category;
    }
    filter.user = req.user._id;
    return filter;
}

const getBudgets = asyncHandler( async ( req, res) => {
    const filter = budgetFilter(req);
    const result = await Budget.findBudget(filter);
    if (result.length !== 0) {
        res.send(result)
    } else {
        res.status(404).json({Error: "Invoice not found"})
    }
});

// Update ----------------
const updateBudget = async (req, res) => {
    if (!req.user){
        res.status(401).json({Error: "User not found"})
    }
    const budget = await Budget.findById(req.params.id);
    console.log("budget", budget)


    if(budget.user.toString() !== req.user._id.toString()) {
        res.status(401).json({Error: "User not authorized"})
    }
    if (budget !== null) {
        const update = {...req.body};
        update.user = budget.user
        const result = await Budget.updateBudget(req.params.id, update );
        if (result.length !== 0) {
            res.send({result: result})
        } else {
            res.status(404).json({Error: "Budget not found"})
        }
    } else {
        res.sendFile({ Error: "The document was not found, check id number" });
    }
};

//Delete ---------------------------------
const deleteBudget = async (req, res) => {
    if (!req.user){
        res.status(401).json({Error: "User not found"})
    }

    const budget = await Budget.findById(req.params.id);

    if(budget.user.toString() !== req.user._id.toString()) {
        res.status(401).json({Error: "User not authorized"})
    }

    await budget.remove()

    res.status(200).json({ message: "budget deleted", id: req.params.id })
}

module.exports = {createBudget, getBudgets, updateBudget, deleteBudget};