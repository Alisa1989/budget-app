import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: 'Failed to connect to server'});
    } else {
    console.log("Successfully connected to MongoDB using Mongoose!");
    }
});

// Schema
const invoiceSchema = mongoose.Schema({
    // name, price, date, recurring, notes
    name: { type: String, required: true},
    date: { type: Date, default: Date.now},
    notes: { type: String, required: false},
    price: { type: Number, required: true},
    category: { type: String, required: true},
    recurring: {type: Boolean, required: true, default: false}

})

const budgetSchema = mongoose.Schema({
    category: { type: String, required: true},
    amount: { type: Number, default: 0 }
})

const Invoice = mongoose.model("Invoice", invoiceSchema);
const Budget = mongoose.model("Budget", budgetSchema);

// INVOICE
// Create ------------
const createInvoice = async ( name, date, notes, price, category, recurring) =>{
    const invoice = new Invoice({
        name: name, 
        date: date, 
        notes: notes, 
        price: price, 
        category: category,
        recurring: recurring
    });
    return invoice.save();
}

// Retrieve -----------
const findInvoice = async(filter) => {
    const query = Invoice.find(filter)
    return query.exec();
}

const findById = async (id) => {
    const query = Invoice.findById(id);
    return query.exec();
}

// Update ------
const updateInvoices = async (id, {name, date, notes, price, category, recurring}) => {
    await Invoice.replaceOne({_id: id}, {
        name: name,
        date: date, 
        notes: notes,
        price: price,
        category: category,
        recurring: recurring
    });
    return {
        name: name,
        date: date, 
        notes: notes,
        price: price,
        category: category,
        recurring: recurring
    }
}

// Delete ------
const deleteByID = async (id) => {
    const result = await Invoice.deleteOne({_id: id})
    return result.deletedCount;
};

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
    const query = Budget.find(filter)
    return query.exec();
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



export {createInvoice, findInvoice, findById, deleteByID, updateInvoices, createBudget, findBudget, updateBudget}