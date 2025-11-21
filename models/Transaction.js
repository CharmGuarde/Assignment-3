const mongoose = require("mongoose"); // imports mongoose

// define Transaction schema
const TransactionSchema = new mongoose.Schema({ // defines schema for Transaction model
    title: { type: String, required: true },      // instead of name
    amount: { type: Number, required: true },   // instead of value
    category: { type: String, required: true },   // instead of type
});

module.exports = mongoose.model("Transaction", TransactionSchema); // exports Transaction model
