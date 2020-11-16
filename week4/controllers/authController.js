'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
    console.log("authenticate.login")
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log("täällä")
        console.log("upassport.authenticate: "+JSON.stringify(user))
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }      
         req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }           // generate a signed son web token with the contents of user object and return it in the response           const token = jwt.sign(user, 'your_jwt_secret');
           console.log("here"+JSON.stringify(user))
           const token = jwt.sign(user, 'your_jwt_secret');
           console.log("token   "+JSON.stringify(token))

           return res.json({user, token});
        });
    })(req, res);
};

module.exports = {
  login,
};