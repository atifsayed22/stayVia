const mongoose = require('mongoose')
const Review = require('./review.js');
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    image: {
        filename: String,
        url: {
          type: String,
          set: (v) => v === "" 
            ? "https://www.pexels.com/photo/white-and-brown-concrete-building-1571460/" 
            : v,
          default: "https://www.pexels.com/photo/white-and-brown-concrete-building-1571460/"
        }
      },
      
    price:{
         type:Number,
    },
    location:{
        type:String,

    },
    country:{
        type:String,

    },
    reviews:[{
      type : mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }]

})
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})
const Listing = mongoose.model('Listing',listingSchema);
module.exports = Listing