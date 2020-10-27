'use strict';
// userRoute
var express = require('express')
var router = express.Router()
const userController = require('../controllers/userController');


router.get('/user',  userController.user_list_get);

router.get('/user/:id',(req, res) => {
userController.user_get(req,res, req.params.id)}
);

router.post('/user', (req, res) => {
  res.send('With this endpoint you can add users.')
});

router.put('/user', (req, res) => {
  res.send('With this endpoint you can edit users.')
});

router.delete('/users', (req, res) => {
  res.send('With this endpoint you can delete users.')
});

module.exports = router
