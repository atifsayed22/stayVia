const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Only store redirect for GET requests
        if (req.method === 'GET') {
            req.session.redirectUrl = req.originalUrl;
        }
        req.flash('error', 'You must be logged in');
        return res.redirect('/login');
    }
    next();
};

// loginMiddelware.js
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    } else {
        res.locals.redirectUrl = '/listing'; // fallback
    }
    next();
};
module.exports.isOwner = async(req,res,next)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id)
    if(!listing.owner._id.equals(res.locals.currStatus._id)){
        req.flash("error"," you don't have authority ")
        return res.redirect(`/listing/${id}`)
    }

    next()
}
module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId}= req.params;
    let review = await Review.findById(reviewId)
    if(!review.author._id.equals(res.locals.currStatus._id)){
        req.flash("error"," you don't have authority ")
        return res.redirect(`/listing/${id}`)
    }

    next()
}
