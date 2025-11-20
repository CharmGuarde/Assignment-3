const Transaction = require("../models/Transaction");

// Show page + list
exports.list = async (req, res) => {
    const transactions = await Transaction.find();

    // convert old fields → new fields (safe fallback)
    const cleaned = transactions.map(t => ({
        _id: t._id,
        title: t.title || t.name || "Untitled",
        amount: t.amount,
        category: t.category || t.type || "Other"
    }));

    res.render("transactions", { transactions: cleaned });
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
