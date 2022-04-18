const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username : {
      required : true,
      type : String
    },
    email : {
      type : String,
      required : true
    },
    phone : {
      type : String,
      required : true
    },
    password : {
      type : String,
      required : true
    },
    status : {
      type : Boolean,
      default : false
    }

});


const User = mongoose.model('users',userSchema);

module.exports = { User };
