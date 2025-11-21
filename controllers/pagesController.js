// renders different pages of the website 
exports.home = (req, res) => {
    res.render("index");
};

exports.about = (req, res) => {
    res.render("about");
};

exports.contact = (req, res) => {
    res.render("contact");
};

