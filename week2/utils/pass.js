'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const fetch = require('node-fetch');

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
  async (username, password, done) => {
    const params = [username];
    try {
      const [user] = await userModel.getUserLogin(params);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        console.log("user  undefined")
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("error here")
      return done(null, { ...user }, { message: 'Logged In Successfully' }); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    }
  }
));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  function (jwtPayload, done) {
    console.log("jwtPayload:  " + JSON.stringify(jwtPayload) + " " + jwtPayload['user_id']);
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return  fetch("http://localhost:3000/user/" + jwtPayload['user_id'])
      .then(res => res.json())
      .then((user) => {
        return done(null, user);
      }).catch(err => {
        return done(err);
      });
  }
));

module.exports = passport;