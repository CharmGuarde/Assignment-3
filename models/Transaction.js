const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    name: String,
    category: String,
    amount: Number,
    type: String,
    date: String,
    notes: String
});

module.exports = mongoose.model("Transaction", transactionSchema);
