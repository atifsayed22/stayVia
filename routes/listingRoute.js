const express = require('express');
const router = express.Router()
const wrapAsync = require('../utils/wrapAsyns.js')
const Listing = require('../models/listing.js');
const ExpressError = require('../utils/ExpressError.js')
const {isLoggedIn,isOwner} = require('../middelware.js')
const listingRoutes = require('../controller/listing.js')
const multer = require('multer')
const{storage}=require('../cloudConfig.js')
const uploads = multer({storage})






// Route to show listings
router.get('/',wrapAsync( listingRoutes.index));
//add new route
router.get('/new', isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs")
})
router.get('/my',isLoggedIn,wrapAsync(listingRoutes.mylistings))
//route to show a particular listing in detail 
router.get('/:id', wrapAsync(listingRoutes.show))
//add new route
router.post("/",uploads.single('listing[image]'), wrapAsync(listingRoutes.addNewListing));
//   edit route and update route
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync(listingRoutes.getEditRoute))
router.put('/:id',isLoggedIn,isOwner,uploads.single('image'),wrapAsync(listingRoutes.UpdateRoute))

// destroy route
router.delete('/:id',isLoggedIn,wrapAsync(listingRoutes.DeleteRoute))

module.exports = router