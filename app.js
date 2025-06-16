if(process.env.NODE_ENV != "production"){

    require('dotenv').config()

}


const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const methodOveride = require('method-override')
const ejsMate = require('ejs-mate')
const{reviewSchema}=require('./schema.js')
const listingRoutes = require('./routes/listingRoute.js')
const reviewRoutes = require('./routes/reviewRoute.js')
const userRoutes = require('./routes/userRoute.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user.js')



app.engine("ejs",ejsMate)


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); 
app.use(express.urlencoded({extended:true}))
app.use(methodOveride('_method'))
app.use(express.static(path.join(__dirname, "public")));


const MongoURL = process.env.ATLASDB_URL



// setting up session

const store = MongoStore.create({
    mongoUrl:MongoURL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})


const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
}

  
app.use(session(sessionOptions))
app.use(flash())

// setting up  passport 
app.use(passport.initialize())
app.use(passport.session())


passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.currStatus=req.user
    res.locals.currentPath = req.path;

    next()
})




// DB connection
// const MongoURL = 'mongodb://127.0.0.1:27017/stayvia';


main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MongoURL);
}

const port = 8080;
app.listen(port, () => {
    console.log("Listening on port", port);
});


// demo user

// app.get('/demouser',async(req,res)=>{
//     let demouser = new User({
//         email:"sayedatif4321@gmai.com",
//         username:"atifsayed222"
//     })
//     let registeredUser = await User.register(demouser,"1234")
//     res.send(registeredUser.username)
// })

// listing,review,user routes
app.use('/listing',listingRoutes)
app.use('/listing/:id/review',reviewRoutes)
app.use('/',userRoutes)



// Root route
app.get('/', (req, res) => {
    res.redirect('/listing'); // or render a homepage if you prefer
});

// Error handling middlewere
app.use((err,req,res,next)=>{
    let {status=500,message="some error occrured"}=err
    console.log("error middlewere-1 activated")
    // res.status(status).send(message)
    res.render('layouts/error.ejs',{err})
})