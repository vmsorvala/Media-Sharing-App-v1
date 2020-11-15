'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const login = (req, res) => {
    console.log("authenticate.login")
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log("täällä")
        delete user.password; // remove password propety from user object
        console.log("upassport.authenticate: " + JSON.stringify(user))
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }           // generate a signed son web token with the contents of user object and return it in the response           const token = jwt.sign(user, 'your_jwt_secret');
            console.log("here authController:" + JSON.stringify(user))
            const token = jwt.sign(user, 'your_jwt_secret');
            console.log("token   " + JSON.stringify(token))

            return res.json({ user, token });
        });
    })(req, res);
};

const user_create_post = async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req); // TODO require validationResult, see userController
    var params = "";
    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        // TODO: bcrypt password
        bcrypt.genSalt(10, function (err, salt) {
            console.log("err  "+err);
            console.log("not hashed password: "+req.body.password)
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                console.log(hash);
                console.log("err  "+err)
                params = [
                    req.body.name,
                    req.body.username,
                    hash, // TODO: save hash instead of the actual password
                ];
                console.log("authcontroller: "+params)
                if (userModel.addUser(1,params[0],params[1],params[2])) {
                    next();
                } else {
                    res.status(400).json({ error: 'register error' });
                }
            });
        });
    }
 
   
}



const logout = (req, res) => {
    req.logout();
    res.json({ message: 'logout' });
};

module.exports = {
    login, logout, user_create_post
};