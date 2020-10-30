'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res,id) => {
  console.log("catController "+id)
  const cats = await catModel.getCat(id);
  res.json(cats);
};


const cat_create_post = async (req, res) => {
  console.log(req.body.name+" "+req.body.age+" "+req.body.weight+" "+req.body.owner);
  await catModel.addCat(req.body.name,req.body.age,req.body.weight,
    req.body.owner,req.file.filename);
  
};

const cat_update_put = async (req, res) => {
  console.log(req.body.name+" "+req.body.age+" "+req.body.weight+" "+req.body.owner);
  await catModel.updateCat(req.body.name,req.body.age,req.body.weight,
    req.body.owner,req.body.id);
  
};

const delete_cat = async (req, res,id) => {
  console.log("catController delete:"+id)
await catModel.deleteCat(id);
  
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
  cat_list_get,cat_get,cat_create_post,cat_update_put,delete_cat

};
