const mongoose = require("mongoose");

// Schema
const invoiceSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    recurring: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

// INVOICE
// Create ------------
const createInvoice = async (name, date, notes, price, category, recurring, user) => {
    console.log("user.id", user.id)
  const invoice = new Invoice({
    name: name,
    date: date,
    notes: notes,
    price: price,
    category: category,
    recurring: recurring,
    user: user._id
  });
  return invoice.save();
};

// Retrieve -----------
const findInvoice = async (filter) => {
  const query = Invoice.find(filter);
  return query.exec();
};

const findById = async (id) => {
  const query = Invoice.findById(id);
  return query.exec();
};

// Update ------
const updateInvoices = async (
  id,
  { name, date, notes, price, category, recurring, user } 
) => {
  const result = await Invoice.findByIdAndUpdate(
    id,
    {
      user: user,
      name: name,
      date: date,
      notes: notes,
      price: price,
      category: category,
      recurring: recurring,
    }, 
    {
      new: true
    }
  );
  return result;
};

// Delete ------
const deleteByID = async (id) => {
  const result = await Invoice.deleteOne({ _id: id });
  return result.deletedCount;
};

module.exports = {
  createInvoice,
  findInvoice,
  findById,
  deleteByID,
  updateInvoices,
};
