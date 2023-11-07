const mongoose = require('mongoose');


// Schema
const invoiceSchema = mongoose.Schema({
    // name, price, date, recurring, notes
    // user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    name: { type: String, required: true},
    date: { type: Date, default: Date.now},
    notes: { type: String, required: false},
    price: { type: Number, required: true},
    category: { type: String, required: true},
    recurring: {type: Boolean, required: true, default: false}
})

const Invoice = mongoose.model("Invoice", invoiceSchema);

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

module.exports = {createInvoice, findInvoice, findById, deleteByID, updateInvoices};
