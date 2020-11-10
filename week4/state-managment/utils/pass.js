'use strict';
   const passport = require('passport');
   const Strategy = require('passport-local').Strategy;
   
   // fake database: ****************
   const users = [
     {
       user_id: 1,
       name: 'Foo Bar',
       email: 'foo@bar.fi',
       password: 'foobar',
     },
     {
       user_id: 2,
       name: 'Bar Foo',
       email: 'bar@foo.fi',
       password: 'barfoo',
     },
   ];
   // *******************

   // fake database functions *********
    const getUser = (id) => {
      const user = users.filter((usr) => {
        if (usr.user_id === id) {
          return usr;
        }
      });
      return user[0];
    };
    
    const getUserLogin = (userName) => {
      const user = users.filter((usr) => {
        if (usr.name === userName) {
          return usr;
        }
      });
      return user[0];
    };
    // *****************
    
   // serialize: store user id in session 
   passport.serializeUser((id, done) => {
     console.log('serialize', id);
     done(null,id)
     // serialize user id by adding it to 'done()' callback
   });
   
   // deserialize: get user id from session and get all user data
   passport.deserializeUser(async (id, done) => {
       // get user data by id from getUser
       console.log('deserialize',getUser(id));
       done(null,getUser(id))
       // deserialize user by adding it to 'done()' callback
   });
   
   passport.use(new Strategy(
       (username, password, done) => {
         // get user by username from getUserLogin
         // if user is undefined
         // return done(null, false);
         // if passwords dont match
         // return done(null, false);
         // if all is ok
         // return done(null, user.user_id);

const user = getUserLogin(username);

if(!user){
    return done(null, false);
}

if(user.password != password){
    return done(null, false); 
}

return done(null, user.user_id);

       }
   ));
   
   module.exports = passport;