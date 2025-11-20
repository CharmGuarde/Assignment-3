const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    title: { type: String, required: true },      // instead of name
    amount: { type: Number, required: true },
    category: { type: String, required: true },   // instead of type
});

module.exports = mongoose.model("Transaction", TransactionSchema);
