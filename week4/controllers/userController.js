'use strict';
// userController
'use strict';
const { validationResult } = require('express-validator');
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
	console.log(JSON.stringify(users));
	delete users[0].password;
	delete users[1].password;
	console.log(JSON.stringify(users));
	res.json(users);
};

const user_get = (req, res, id) => {
	//console.log(JSON.stringify(users.filter(user=>users.id==id)))
	const user = users.filter(user => user.id == id);

	delete user[0].password;
	console.log(JSON.stringify(user[0])); // true
	res.json(user);
};

const user_create_post = async (req, res) => {
	console.log(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// Object Destructuring
	const { name, email, password } = req.body;
	const params = [name, email, password];
	const user = await userModel.addUser(params);
	res.json({ message: 'user create ok' });
};

module.exports = {
	user_list_get,
	user_get,
	user_create_post,
};
