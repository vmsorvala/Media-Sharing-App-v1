'use strict';
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

const getcat = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id = X');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }   
};

module.exports = {
  getAllCats, getCat,
};