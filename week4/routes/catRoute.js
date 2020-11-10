'use strict';
// catRoute
var express = require('express')
var router = express.Router()
const catController = require('../controllers/catController');
const multer = require('multer') // v1.0.5
//const upload = multer({ dest: 'uploads/' }) // for parsing multipart/form-data

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


var upload = multer({ storage: storage })

router.get('/cat',  catController.cat_list_get);

router.get('/cat/:id',(req, res) => {
catController.cat_get(req,res, req.params.id)}
);

router.post('/cat', upload.single('cat'), function (req, res) {
  catController.cat_create_post(req,res);
    console.log(req.body )
    res.json(req.body)
});

router.put('/cat', (req, res,id) => {
  catController.cat_update_put(req,res);
   
});

router.delete('/cat/:id', (req, res) => {
  catController.delete_cat(req,res,req.params.id);
});

module.exports = router
