'use strict';
// catController
const catModel = require('../models/catModel');
const { validationResult } = require('express-validator');
const cats = catModel.cats;

const cat_list_get = (req, res) => {
	res.json(cats);
};

const cat_get = (req, res, id) => {
	console.log(JSON.stringify(cats.filter(cat => cat.id == id)));
	res.json(cats.filter(cat => cat.id == id));
};

const cat_create_post = async (req, res) => {
	console.log(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// Object Destructuring
	const { name, age, weight, owner } = req.body;
	const params = [name, age, weight, owner];
	const cat = await catModel.addCat(params);
	res.json({ message: 'upload ok' });
};

const cat_update_put = async (req, res) => {
	console.log(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	// Object Destructuring
	const { name, age, weight, owner, id } = req.body;
	const params = [name, age, weight, owner, id];
	const cat = await catModel.updateCat(params);
	res.json({ message: 'modify ok' });
};

module.exports = {
	cat_list_get,
	cat_get,
	cat_create_post,
	cat_update_put,
};
