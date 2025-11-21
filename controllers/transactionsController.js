const Transaction = require("../models/Transaction");

// show page + list
exports.list = async (req, res) => { // shows all transactions
    const transactions = await Transaction.find(); // fetch all transactions

    // convert old fields to new fields (safe fallback) 
    const cleaned = transactions.map(t => ({ // map to new structure
        _id: t._id, // keep the id
        title: t.title || t.name || "Untitled", // fallback for old 'name' field
        amount: t.amount, // amount stays the same
        category: t.category || t.type || "Other" // fallback for old 'type' field
    })); // map each transaction

    res.render("transactions", { transactions: cleaned }); // render with cleaned data
};

// add, update, delete operations
exports.add = async (req, res) => { // add new transaction
    await Transaction.create(req.body); // create new transaction
    res.redirect("/transactions"); // redirect to list
};

exports.update = async (req, res) => { // update existing transaction
    await Transaction.findByIdAndUpdate(req.params.id, req.body); // update by id
    res.redirect("/transactions"); // redirect to list
};

exports.delete = async (req, res) => { // delete transaction
    await Transaction.findByIdAndDelete(req.params.id); // delete by id
    res.redirect("/transactions"); // redirect to list
}; 
