'use strict';
// userRoute
var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
const userController = require('../controllers/userController');
// create application/json parser
router.get('/user', userController.user_list_get);

router.get('/user/:id', (req, res) => {
	userController.user_get(req, res, req.params.id);
});

router.post(
	'/user',
	[
		body('name', 'Name should be at least 3 characters')
			.isLength({ min: 3 })
			.escape(),
		body('email', 'Please Enter a Valid Email').isEmail(),
		body(
			'password',
			' minimum length 8 characters, at least one capital letter'
		).matches('(?=.*[A-Z]).{8,}'),
	],
	userController.user_create_post
);

router.put('/user', (req, res) => {
	res.send('With this endpoint you can edit users.');
});

router.delete('/users', (req, res) => {
	res.send('With this endpoint you can delete users.');
});

module.exports = router;
