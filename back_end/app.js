const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
var path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');

// Database Connection integration
const {connectDB} = require("./config/connection");

//load config
dotenv.config({ path: "./config/config.env" });

//database connection establishing
connectDB();


const indexRouter = require("./routes/index");


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//setting up logger
app.use(logger("dev"));


//setting default static folder as public folder
app.use(express.static(path.join(__dirname, "public")));

//cache controller
// setting no cache
app.use((req, response, next) => {
    response.set("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    next();
  });

//================ cors setting ==================

app.use(cors({origin:"*"}));


//route setting
app.use("/", indexRouter);


//=================== Error handling middleware ====================
app.use((req, res, next) => {
    res.statusCode = 404;
    throw new Error("Not Found");
    next();
  });
  app.use((err, req, res, next)=> {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    // console.log(err);
    // render the error page
    // console.log(er);
    // console.log("error status", err.code);
    // console.log(res.statusCode);
    res.statusCode = res.statusCode || 500;
    res.json({ error : err });
    
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  );
