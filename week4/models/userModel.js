'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();



const getUserLogin = async (params) => {
  try { 
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE name = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};


const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

const getUser = async (id) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.execute('SELECT * FROM wop_user WHERE user_id ='+id);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

const addUser = async (id,name1,email1,pw1) => {
  try {
     // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    var query="INSERT INTO wop_user (name,email,password) VALUES  (\'" +name1+"\',\'"+email1+"\',\'"+pw1+"\');";
   query.replace(/[^a-zA-Z@";,]/g, "")
    console.log("usermodel "+query)
  
    const [rows] = 
    await promisePool.execute(query); 
   
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};


module.exports = {
  getAllUsers, getUser,addUser,getUserLogin
};