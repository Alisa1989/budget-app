import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// Schema
const invoiceSchema = mongoose.Schema({
    // name, price, date, recurring, notes
    name: { type: String, required: true},
    date: { type: Date, default: Date.now},
    notes: { type: String, required: false},
    price: { type: Number, required: true},
    recurring: {type: Boolean, required: true, default: false}

})

const Invoice = mongoose.model("Invoice", invoiceSchema);

// Create ------------
const createInvoice = async ( name, date, notes, price, recurring) =>{
    const invoice = new Invoice({name: name, date: date, notes: notes, price: price, recurring: recurring})
    return invoice.save();
}

// Retrieve -----------
const findInvoices = async(filter) => {
    const query = Invoice.find(filter)
        .select('name date notes price recurring _id');
    return query.exec();
}

const findById = async (_id) => {
    const query = Invoice.findById(_id);
    return query.exec();
}

// Update ------

const updateInvoices = async (filter, update) => {
    const result = await Invoice.updateOne(filter, update);
    return result.modifiedCount;
}

// Delete ------
const deleteByID = async (id) => {
    const result = await Invoice.deleteOne({_id: id})
    return result.deletedCount;
};

const deleteByProperty = async (filter) => {
    const result = await Invoice.deleteMany(filter);
    return result.deletedCount
}


db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: 'Failed to connect to server'});
    } else {
    console.log("Successfully connected to MongoDB using Mongoose!");
    }
});

export {createInvoice, findInvoices, findById, deleteByID, deleteByProperty, updateInvoices}