'use strict';
// userRoute
var express = require('express')
var router = express.Router()
const userController = require('../controllers/userController');
const multer = require('multer') // v1.0.5
const { body, validationResult } = require('express-validator');
const passport = require('../utils/pass.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + 'as ms -' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


var upload = multer({ storage: storage })


// create application/json parser
router.get('/user', passport.authenticate('jwt', {session: false}), userController.user_list_get);

router.get('/user/:id',(req, res) => {
userController.user_get(req,res, req.params.id)}
);

router.put('/user', (req, res) => {
  res.send('With this endpoint you can edit users.')
});

router.delete('/users', (req, res) => {
  res.send('With this endpoint you can delete users.')
});

module.exports = router
