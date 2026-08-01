const mongoose = require('mongoose');

module.exports = async function connectDB(mongoUrl) {
    if (!mongoUrl) {
        throw new Error('ATLASDB_URL is required');
    }

    await mongoose.connect(mongoUrl);
    console.log("MongDb Connected") ; 
};