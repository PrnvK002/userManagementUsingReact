const { MONGO_URI } = require('./config');
const mongoose = require('mongoose');

async function connectDB(){

    try{

        const connect = await mongoose.connect(MONGO_URI);
        console.log("------------MONGODB SUCCESSFULLY CONNECTED----------------")

    }catch(err){
        console.log("------------ Error occured while connecting mongodb --------------");
        console.log(err);
        process.exit(1);
    }

} 


module.exports = { connectDB };