const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js')

let MongoURL = 'mongodb://127.0.0.1:27017/stayvia'

main().then((res)=>{
    console.log("connected to DB")

}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(MongoURL)
}

const initDB = async ()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner:"68474a8df5a42c81320f65cc"}))
    await Listing.insertMany(initData.data)
    console.log(initData.data)
}
initDB()