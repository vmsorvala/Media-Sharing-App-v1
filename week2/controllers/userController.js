'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  delete users[0].password
  delete users[1].password
  res.json(users);
};

const user_get = async (req, res,id) => {
  console.log("userController "+id)
  const users = await userModel.getUser(id);
  //delete users[0].password
  res.json(users);
};


/*
const cat_list_get = (req, res) => {
  res.json(cats);
};

const cat_get= (req,res,id)  => {
  console.log(JSON.stringify(cats.filter(cat=>cat.id==id)))
  res.json(cats.filter(cat=>cat.id==id));
  
   
}
   */

   
module.exports = {
  user_list_get,user_get
};
