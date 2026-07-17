const User = require('../models/user.js');
const passport = require('passport');

// Show signup form
module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

// Handle signup logic
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', "Signup and logged-in successfully");
            res.redirect('/listing');
        });
    } catch (err) {
        next(err);
    }
};

// Show login form
module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

// Handle login success
module.exports.login = (req, res) => {
    req.flash('success', 'Login successful, welcome to StayVia');
    res.redirect(res.locals.redirectUrl || '/listing');
};

// Handle logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Logout successful');
        res.redirect('/listing');
    });
};
