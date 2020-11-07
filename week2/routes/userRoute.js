'use strict';
// userRoute
var express = require('express')
var router = express.Router()
const userController = require('../controllers/userController');
const multer = require('multer') // v1.0.5
const { body, validationResult } = require('express-validator');

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
router.get('/user',  userController.user_list_get);

router.get('/user/:id',(req, res) => {
userController.user_get(req,res, req.params.id)}
);

router.post('/user', [
  body('name').isLength({ min: 3 }),
  body('name').matches(/^(?=.*?[A-Z])[\w\h-]{3,25}$/,"i").withMessage('ignore special characters and spaces'),
   body('email').isEmail(),
   body('passwd').matches(/.{8,}/, "i").withMessage('Password must be length of 8 or over'),
   body('passwd').matches(/(?=.*[A-Z])/, "i").withMessage('Password must contain one uppercase'),
   body('passwd').matches(/^(?=.*?[A-Z])[\w\h-]{8,30}$/,"i").withMessage('ignore special characters and spaces'),

],
(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {console.log(JSON.stringify(req.body)) ;
    return res.status(400).json({ errors: errors.array() });
  }

  userController.user_create_post(req,res);
 console.log(JSON.stringify(req.body))  
res.json(req.body)

});

router.put('/user', (req, res) => {
  res.send('With this endpoint you can edit users.')
});

router.delete('/users', (req, res) => {
  res.send('With this endpoint you can delete users.')
});

module.exports = router
