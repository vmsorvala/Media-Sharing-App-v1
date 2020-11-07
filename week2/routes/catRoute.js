'use strict';
// catRoute
var express = require('express')
var router = express.Router()
const catController = require('../controllers/catController');
const multer = require('multer') // v1.0.5
//const upload = multer({ dest: 'uploads/' }) // for parsing multipart/form-data
const { body,validationResult } = require('express-validator');
const path = require('path');
var bodyParser = require('body-parser');
const { Console } = require('console');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


var upload = multer({ storage: storage,fileFilter: function(_req, file, cb){
  checkFileType(file, cb);
} })
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
    
  }
}

router.get('/cat',  catController.cat_list_get);

router.get('/cat/:id',(req, res) => {
catController.cat_get(req,res, req.params.id)}
);

router.post('/cat',


upload.single('cat'), 
 [
  // username must be an email
  body('name').not().isEmpty().withMessage("can\'t be empty"),
  body('name').matches(/^(?=.*?[A-Z])[\w\h-]{1,25}$/,"i").withMessage('ignore special characters and spaces'),
  body('age').not().isEmpty().withMessage("can\'t be empty"),
  body('age').isNumeric().withMessage("must be numeric"),
  body('weight').not().isEmpty().withMessage("can\'t be empty"),
  body('weight').isNumeric().withMessage("must be numeric"),
  body('owner').not().isEmpty().withMessage("can\'t be empty"),
   // name must be at least 4 chars long
  //body('name').isLength({ min: 3 }),

],
function (req, res) {
  console.log(req.body.name.length)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors")
    
    return res.status(400).json({ errors: errors.array() });
  }  
  catController.cat_create_post(req,res);
  console.log(JSON.stringify(req.body))  
    res.json(req.body)
});

router.put('/cat',[
  body('name').not().isEmpty().withMessage("can\'t be empty"),
  body('name').matches(/^(?=.*?[A-Z])[\w\h-]{1,25}$/,"i").withMessage('ignore special characters and spaces'),
  body('age').not().isEmpty().withMessage("can\'t be empty"),
  body('age').isNumeric().withMessage("must be numeric"),
  body('weight').not().isEmpty().withMessage("can\'t be empty"),
  body('weight').isNumeric().withMessage("must be numeric"),
  body('owner').not().isEmpty().withMessage("can\'t be empty"),

 

], (req, res,id) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors")
    
    return res.status(400).json({ errors: errors.array() });
  }  
 
  catController.cat_update_put(req,res);
   
});

router.delete('/cat/:id', (req, res) => {
  catController.delete_cat(req,res,req.params.id);
});

module.exports = router
