import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const invoiceSchema = mongoose.Schema({
    // name, price, date, recurring, notes
    name: { type: String, required: true},
    date: { type: Date, required: true},
    notes: { type: String, required: false},
    price: { type: Number, required: true},
    recurring: {type: Boolean}

})

const Invoice = mongoose.model("Invoice", invoiceSchema);

const createInvoice = async ( name, date, notes, price, recurring) =>{
    const invoice = new Invoice({name: name, date: date, notes: notes, price: price, recurring: recurring})
    return invoice.save();
}

const findInvoices = async(filter) => {
    const query = Invoice.find(filter);
    return query.exec();
}

const findById = async (_id) => {
    const query = Movie.findById(_id);
    return query.exec();
}

db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: 'Failed to connect to server'});
    } else {
    console.log("Successfully connected to MongoDB using Mongoose!");
    }
});

export {createInvoice, findInvoices, findById}