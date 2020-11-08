'use strict';
// catRoute
var express = require('express');
const { body } = require('express-validator');
var router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer'); // v1.0.5

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.includes('image')) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({ dest: 'uploads/', fileFilter }); // for parsing multipart/form-data

// var upload = multer({ storage: storage });

const injectFile = (req, res, next) => {
	if (req.file) {
		req.body.mimetype = req.file.mimetype;
	}
	next();
};

router.get('/cat', catController.cat_list_get);

router.get('/cat/:id', (req, res) => {
	catController.cat_get(req, res, req.params.id);
});

router.post(
	'/cat',
	upload.single('cat'),
	injectFile,
	[
		body('name', 'Please Enter A name').isLength({ min: 1 }),
		body('age', 'Please Enter age,Age must be a number')
			.isLength({ min: 1 })
			.isNumeric(),
		body('weight', ' Please Enter weight,weight must be a number')
			.isLength({ min: 1 })
			.isNumeric(),
		body('owner', 'Please Enter a Valid Name').isLength({ min: 1 }),
		body('mimetype', 'Please upload an image').contains('image'),
	],
	catController.cat_create_post
);

router.put(
	'/cat/:id',
	[
		body('name', 'Please Enter A name').isLength({ min: 1 }),
		body('age', 'Please Enter age,Age must be a number')
			.isLength({ min: 1 })
			.isNumeric(),
		body('weight', ' Please Enter weight,weight must be a number')
			.isLength({ min: 1 })
			.isNumeric(),
		body('owner', 'Please Enter a Valid Name').isLength({ min: 1 }),
	],
	catController.cat_update_put
);

router.delete('/cat', (req, res) => {
	res.send('With this endpoint you can delete cats.');
});

module.exports = router;
