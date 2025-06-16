const Listing = require('../models/listing.js');

module.exports.index=async (req, res) => {
    const listings = await Listing.find().populate({
        path:'reviews',
        select:'rating'
    });
    listings.forEach(listing => {
        if (listing.reviews.length > 0) {
          const total = listing.reviews.reduce((acc, review) => acc + review.rating, 0);
          listing.avgRating = (total / listing.reviews.length).toFixed(1);
        } else {
          listing.avgRating = null;
        }
      });

      

    res.render("listings/index.ejs", { 
        listings ,
        search: '',          // default empty string
        maxPrice: '',        // default empty string
        minRating: ''        // default empty string

    }); // ✅ FIXED
}

module.exports.show= async (req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
    
    console.log(listing)
    res.render("listings/show.ejs",{listing})
}
module.exports.addNewListing=async (req, res,next) => {
    let url = req.file.path
    let filename=req.file.filename
    let { title, description, image, price, location, country } = req.body;
    let listing = new Listing({
      title: title,
      description: description,
      price: price,
      location: location,
      country: country,
    });
    listing.owner=req.user._id
    listing.image={url,filename}
    await listing.save();
    req.flash("success","new listing added succesfully")
    res.redirect("/listing");


}
module.exports.getEditRoute= async(req,res)=>{
    let {id}= req.params;
    let data= await Listing.findById(id)

    res.render("listings/edit.ejs",{data})
}
module.exports.UpdateRoute=async (req,res)=>{
    let {id}= req.params;
    
    let { title, description, image, price, location, country } = req.body;
   let updatedlisting= await Listing.findByIdAndUpdate(id,{ 
        title:title,
        description:description,
        price:price,
        location:location,
        country:country
     })
     if(typeof req.file !=="undefined"){
        let url = req.file.path
        let filename = req.file.filename
         updatedlisting.image = {url,filename}
         await updatedlisting.save()

     }
     req.flash("success"," listing update succesfully")
    res.redirect('/listing')

}
module.exports.DeleteRoute=async (req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id)
    console.log(deleted)
    req.flash("success"," listing deleted succesfully")
    res.redirect('/listing')
    
}
module.exports.mylistings=async(req,res)=>{
    const listings = await Listing.find();

    listings.forEach(listing => {
        if (listing.reviews.length > 0) {
          const total = listing.reviews.reduce((acc, review) => acc + review.rating, 0);
          listing.avgRating = (total / listing.reviews.length).toFixed(1);
        } else {
          listing.avgRating = null;
        }
      });

    res.render("listings/mylisting.ejs", { listings }); // ✅ FIXED

}