'use strict';
// userController
'use strict';
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
  console.log(JSON.stringify(users));
  delete users[0].password
  delete users[1].password
  console.log(JSON.stringify(users));
  res.json(users);
};

const user_get= (req,res,id)  => {
  //console.log(JSON.stringify(users.filter(user=>users.id==id)))
  const user=users.filter(user=>user.id==id);
  

  delete user[0].password;
  console.log(JSON.stringify(user[0])) // true
  res.json(user);
  
   
}


   
module.exports = {
  user_list_get,user_get

};
