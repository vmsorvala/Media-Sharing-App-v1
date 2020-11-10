'use strict';
const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var catRouter = require('./routes/catRoute')
var userRouter = require('./routes/userRoute')
const passport = require("./utils/pass.js");
const authRoute = require("./routes/authRoute.js")

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',authRoute);
app.use(passport.authenticate('jwt', {session: false}),catRouter)
app.use(passport.authenticate('jwt', {session: false}),userRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
