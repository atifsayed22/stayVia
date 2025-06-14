const express = require('express')
const router = express.Router({mergeParams:true})
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const wrapAsync = require('../utils/wrapAsyns.js')
const ExpressError = require('../utils/ExpressError.js')
const {reviewSchema} = require('../schema.js')
const {isLoggedIn,isOwner,isReviewAuthor} = require('../middelware.js')
const ReviewRoute = require('../controller/review.js')


const validateReview = (req,res,next)=>{
    let {error} =reviewSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",")
    }else{
        next()
    }
}

// add review route
router.post('/',isLoggedIn,validateReview, wrapAsync(ReviewRoute.addReview))
// delete comment route 
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(ReviewRoute.DeleteReview))

module.exports = router