const asyncHandler = require('express-async-handler');
const budget = require('../models/budgetModel');


// Create ----------------------
const createBudget = ( req, res) => {
    console.log("req.body", req.body)
    budget.createBudget(
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
    return filter;
}

const getBudgets = asyncHandler( async ( req, res) => {
    // console.log(req.body)
    const filter = budgetFilter(req);
    const result = await budget.findBudget(filter);
    if (result.length !== 0) {
        res.send(result)
    } else {
        res.status(404).json({Error: "Invoice not found"})
    }
});

// Update ----------------
const updateBudget = async (req, res) => {
    // console.log("params", req.params)
    // console.log("body", req.body)
    const budget = await budget.findByCategory(req.params.category);
    if (budget !== null) {
        const update = {};
        if (req.body.amount !== undefined) {
        update.amount = req.body.amount;
        }
        const result = await budget.updateInvoices({ category: req.params.category}, update );
        if (result.length !== 0) {
            res.send({result: result})
        } else {
            res.status(404).json({Error: "Budget not found"})
        }
    } else {
        res.sendFile({ Error: "The document was not found, check id number" });
    }
};

module.exports = {createBudget, getBudgets, updateBudget};