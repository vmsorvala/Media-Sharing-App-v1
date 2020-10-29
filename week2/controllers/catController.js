'use strict';
// catController
'use strict';
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
  cat_list_get,cat_get

};
