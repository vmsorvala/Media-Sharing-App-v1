'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const fetch = require('node-fetch');

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var bcrypt = require('bcryptjs');


// local strategy for username password login
passport.use(new Strategy(
  async (username, password, done) => {
    const params = [username];
    try {
      const [user] = await userModel.getUserLogin(params);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) { // user not found
        return done(null, false);
      }
      // TODO: use bcrypt to check of passwords don't match
      const onkosamat=await bcrypt.compare(password, user.password);
      console.log(password+' pass.js here  '+user.password+" onko samat!!! "+onkosamat);
      if (!(await bcrypt.compare(password, user.password))
      ) { // passwords dont match
      
        return done(null, false);
      }
     
        return done(null, { ...user }); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) { // general error
      return done(err);
    }
  }));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  function (jwtPayload, done) {
    console.log("jwtPayload:  " + JSON.stringify(jwtPayload) + " " + jwtPayload['user_id']);
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return fetch("http://localhost:3000/user/" + jwtPayload['user_id'])
      .then(res => res.json())
      .then((user) => {
        return done(null, user);
      }).catch(err => {
        return done(err);
      });
  }
));

module.exports = passport;