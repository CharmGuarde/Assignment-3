const Transaction = require("../models/Transaction");

// Show page + list
exports.list = async (req, res) => {
    const transactions = await Transaction.find();
    res.render("transactions", { transactions });
};

exports.add = async (req, res) => {
    await Transaction.create(req.body);
    res.redirect("/transactions");
};

exports.update = async (req, res) => {
    await Transaction.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/transactions");
};

exports.delete = async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.redirect("/transactions");
};
