'use strict';
const express = require('express');
const app = express();
const port = 3000;

// At the top of your server.js
process.env.PWD = process.cwd()

// Then
app.use(express.static(process.env.PWD + '/uplads'));



app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
