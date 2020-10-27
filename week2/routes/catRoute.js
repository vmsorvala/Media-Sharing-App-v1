'use strict';
// catRoute
var express = require('express')
var router = express.Router()

router.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

router.get('/cat/:id', (req, res) => {
  res.send('You reqested a cat whose id is '+req.params.id);
});

router.post('/cat', (req, res) => {
  res.send('With this endpoint you can add cats.')
});

router.put('/cat', (req, res) => {
  res.send('With this endpoint you can edit cats.')
});

router.delete('/cat', (req, res) => {
  res.send('With this endpoint you can delete cats.')
});

module.exports = router
