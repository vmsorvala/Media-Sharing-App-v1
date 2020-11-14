'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const fetch = require('node-fetch');

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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
      if (password !== user.password) { // passwords dont match
        console.log('here');
        return done(null, false);
      }
      delete user.password; // remove password propety from user object
      return done(null, {...user}); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) { // general error
      return done(err);
    }
  }));

module.exports = passport;