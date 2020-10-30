'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

const getCat = async (id) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id ='+id);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

const addCat = async (name,age,weight,owner,filename) => {
  try {
     // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    var query="INSERT INTO wop_cat (name,age,weight,owner,filename) VALUES  (\'" +name+"\',\'"+age+"\',\'"+weight+"\',\'"+owner+"\',\'"+filename+"\');";
   query.replace(/[^a-zA-Z@";,]/g, "")
    console.log("usermodel "+query)
  
    const [rows] = 
    await promisePool.execute(query); 
   
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

const updateCat = async (name,age,weight,owner,id) => {
  try {
     // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    var query="UPDATE wop_cat SET name=\'"+name+"\', age=\'"+age+"\',weight=\'"+weight+"\',owner=\'"+owner+"\' where cat_id=\'"+id+"\';"
       console.log("usermodel "+query)
  
    const [rows] = 
    await promisePool.execute(query); 
   
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

const deleteCat = async (id) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.execute('delete FROM wop_cat WHERE cat_id ='+id);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

module.exports = {
  getAllCats, getCat,addCat,updateCat,deleteCat
};