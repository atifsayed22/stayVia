const express = require('express');
const router = express.Router()
const wrapAsync = require('../utils/wrapAsyns.js')
const User = require('../models/user.js')

router.get('/signup',(req,res)=>{
    res.render("users/signup.ejs")
})
router.post('/signup', wrapAsync(async (req,res)=>{
    let {username,email,password}=req.body
    const newUser = new User({
        email,username
    })
    const registeredUser = await User.register(newUser,password)
    req.flash('success',"signup Successfull")
    res.redirect('/listing')
}))



module.exports = router