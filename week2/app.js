'use strict';
const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var catRouter = require('./routes/catRoute')
var userRouter = require('./routes/userRoute')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(cors())
app.use(catRouter)
app.use(userRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
