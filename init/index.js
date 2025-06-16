const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js')

let MongoURL = 'mongodb+srv://sayedatif4321:sayedaatif%4022@cluster0.fahauhr.mongodb.net/stayViaDB?retryWrites=true&w=majority&appName=Cluster0'

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
    initData.data=initData.data.map((obj)=>({...obj,owner:"684de5ea9698deb81674a43c"}))
    await Listing.insertMany(initData.data)
    console.log(initData.data)
}
initDB()