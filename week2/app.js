'use strict';
const express = require('express');
const app = express();
const port = 3000;

var catRouter = require('./routes/catRoute')
var userRouter = require('./routes/userRoute')

app.use(catRouter)
app.use(userRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));