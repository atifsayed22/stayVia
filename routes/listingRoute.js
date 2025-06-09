const express = require('express');
const router = express.Router()
const wrapAsync = require('../utils/wrapAsyns.js')
const Listing = require('../models/listing.js');
const ExpressError = require('../utils/ExpressError.js')






// Route to show listings
router.get('/',wrapAsync( async (req, res) => {
    const listings = await Listing.find();

    res.render("listings/index.ejs", { listings }); // ✅ FIXED
}));
//add new route
router.get('/new',(req,res)=>{
    res.render("listings/new.ejs")
})
//route to show a particular listing in detail 
router.get('/:id', wrapAsync(async (req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id).populate("reviews")
    
    console.log(listing)
    res.render("listings/show.ejs",{listing})
}))
//add new route
router.post("/", wrapAsync( async (req, res,next) => {

   

        let { title, description, image, price, location, country } = req.body;
      
        let listing = new Listing({
          title: title,
          description: description,
          image: {
            url: image,
            filename: "default", // or handle filename if using file uploads
          },
          price: price,
          location: location,
          country: country,
        });
      
        await listing.save();
        req.flash("success","new listing added succesfully")
        res.redirect("/listing");
    
  }));
//   edit route and update route
router.get('/:id/edit',wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let data= await Listing.findById(id)

    res.render("listings/edit.ejs",{data})
}))
router.put('/:id',wrapAsync(async (req,res)=>{
    let {id}= req.params;
    let { title, description, image, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id,{ 
        title:title,
        description:description,
        image:{
            url:image,
        },
        price:price,
        location:location,
        country:country
     })
     req.flash("success"," listing update succesfully")
    res.redirect('/listing')

}))

// destroy route
router.delete('/:id',wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id)
    console.log(deleted)
    req.flash("success"," listing deleted succesfully")
    res.redirect('/listing')
    
}))

module.exports = router