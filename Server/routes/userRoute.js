const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsyns.js');
const { saveRedirectUrl } = require('../middelware.js');
const userController = require('../controller/user.js');

router.get('/signup', userController.renderSignup);

router.post('/signup', wrapAsync(userController.signup));

router.get('/login', userController.renderLogin);

router.post('/login',
    saveRedirectUrl,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login"
    }),
    userController.login
);

router.get('/logout', userController.logout);

module.exports = router;
