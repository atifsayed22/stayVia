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
router.get('/filters', wrapAsync(async (req, res) => {
    const { search = '', maxPrice, minRating } = req.query;
    const filter = {};

    if (search.trim() !== '') {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
            { country: { $regex: search, $options: 'i' } }
        ];
    }

    if (maxPrice) {
        filter.price = { $lte: parseInt(maxPrice) };
    }

    // Get all filtered listings (EXCEPT rating)
    let listings = await Listing.find(filter).populate({
        path: 'reviews',
        select: 'rating'
    });

    // If minRating is provided, filter manually in JS
    if (minRating) {
        listings = listings.filter(listing => {
            if (listing.reviews.length === 0) return false;
            const total = listing.reviews.reduce((acc, review) => acc + review.rating, 0);
            const avg = total / listing.reviews.length;
            listing.avgRating = avg.toFixed(1); // optional: store avgRating for display
            return avg >= Number(minRating);
        });
    }
    const listingsWithRatings = listings.map(listing => {
        const reviews = listing.reviews || [];
        const total = reviews.reduce((acc, r) => acc + r.rating, 0);
        const avgRating = reviews.length ? total / reviews.length : null;
        return { ...listing.toObject(), avgRating };
      });
      
    

    // 🔁 Return JSON if AJAX, else render page
    if (req.xhr) {
        return res.json({ listings:listingsWithRatings });
    }else{

        res.render("listings/index", {
            listings,
            search,
            maxPrice,
            minRating,
        });
    }


    // res.render('listings/index.ejs', { listings, search, maxPrice, minRating });
}));



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