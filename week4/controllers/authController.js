'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
    console.log("dsgfggdf")
    passport.authenticate('local', {session: false}, (err,user , info) => {

        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       
       req.login(user, {session: false}, (err) => {
           if (err) {
               console.log(err)
               res.send(err);
               
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
};

module.exports = {
  login,
};