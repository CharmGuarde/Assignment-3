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

// handles contact form submission
exports.handleContact = (req, res) => { 
    const { name, email, phone, message } = req.body; // extract form data from the request body

    console.log("CONTACT FORM DATA:", req.body); // log the form data to the console for debugging

    res.render("contact-success", { // render the success page with the submitted data
        name: name,
        email: email,
        phone: phone,
        message: message
    });
};
