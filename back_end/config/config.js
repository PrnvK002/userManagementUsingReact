const dotenv = require('dotenv');

//load config
dotenv.config({ path : './config/config.env'});

module.exports = { 
    MONGO_URI : process.env.MONGO_URI,
    PORT : process.env.PORT,
    JWT_ACCESS_TOKEN_SECRET_KEY : process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET_KEY : process.env.JWT_REFRESH_TOKEN_SECRET
 }