const { User } = require("../models/user");
const mongoose = require("mongoose");

function findUser(userId) {
  let id = mongoose.Types.ObjectId(userId);
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await User.findOne({ _id: id }).lean();

      if (!userData) {
        reject("----------------- Cannot find user Details -------------");
      } else {
        resolve(userData);
      }
    } catch (err) {
      console.log(err);
      reject("Error occured while finding the user");
    }
  });
}

function findAllUser() {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await User.find({}).lean();
      if (users) {
        resolve(users);
      } else {
        console.log(users);
        reject("Cannot find Users");
      }
    } catch (err) {
      console.log(err);
      reject("Cannot find Users");
    }
  });
}

function insertUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = new User({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password
      });

      let status = await user.save();

      if (!status) {
        console.log(status);
        reject("Failed to insert the user");
      } else {
        console.log(status);
        resolve(status);
      }
    } catch (err) {
      console.log(err);
      reject("Error occured while inserting the user");
    }
  });
}

function loginCheck(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await User.findOne({
        email: email,
        password: password,
      }).lean();
      if (!check) {
        console.log(check);
        reject("user not found");
      } else {
        console.log(check);
        resolve(check);
      }
    } catch (err) {
      console.log(err);
      reject("user not found");
    }
  });
}

function updateUser(data) {
  let id = mongoose.Types.ObjectId(data.id);
  return new Promise(async (resolve, reject) => {
    try {
      let update = await User.updateOne(
        { _id: id },
        {
          $set: {
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.phone,
          },
        }
      );

      if (!update) {
        console.log(update);
        reject("Cannot update User");
      } else {
        console.log(update);
        resolve("Successfully updated the user");
      }
    } catch (err) {
      console.log(err);
      reject("Error occured whilte updating the user");
    }
  });
}

function deleteUser(id){

  let Id = mongoose.Types.ObjectId(id);
  return new Promise(async (resolve,reject) => {
    try{
      let status = await User.deleteOne({ _id : Id });
      console.log(status);
      resolve("Successfully deleted User");
    }catch(err){
      console.log(err);
      reject("Error occured while deleting user");
    }

  })

}

function searchUser(user){

  console.log(user);
  return new Promise(async (resolve,reject) => {

      try{

          let users = await User.find({ username : { $regex : user , $options :'i' } }).lean();
          resolve(users);

      }catch(err){

        console.log(err);
        reject('Cannot find users');
      }

  })

}


module.exports = { insertUser, updateUser, findUser, loginCheck , findAllUser , deleteUser , searchUser};
