'use strict';
const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;
const passport = require('./utils/pass.js');
const authRoute=require('./routes/authRoute.js');
var bodyParser = require('body-parser');
var catRouter = require('./routes/catRoute')
var userRouter = require('./routes/userRoute')
var path = require('path');
const expressValidator = require('express-validator')


app.use("/uploads", express.static(path.join(__dirname, '/uploads')));
app.use('/thumbnails', express.static('thumbnails'));


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(cors())
app.use(catRouter)
app.use(userRouter)
app.use(authRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
