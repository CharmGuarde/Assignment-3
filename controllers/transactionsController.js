const Transaction = require("../models/Transaction");

// List all
exports.list = async (req, res) => {
    const transactions = await Transaction.find();
    res.render("transactions/index", { transactions });
};

// Show add form
exports.addForm = (req, res) => {
    res.render("transactions/create");
};

// Create
exports.add = async (req, res) => {
    await Transaction.create(req.body);
    res.redirect("/transactions");
};

// Show edit form
exports.editForm = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.render("transactions/edit", { transaction });
};

// Update
exports.update = async (req, res) => {
    await Transaction.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/transactions");
};

// Show delete page
exports.deleteForm = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.render("transactions/delete", { transaction });
};

// Delete
exports.delete = async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.redirect("/transactions");
};
