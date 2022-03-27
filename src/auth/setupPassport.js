const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');




module.exports = function() {

    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });
      
    passport.deserializeUser(function(id, done) {

      User.findById(id, function(err, user) {

        done(err, user);

      });

    });

    passport.use(new LocalStrategy(

    async function(username, password, done) {

      try {

        console.log("username is", username)

        const user = await User.findOne({ username: username });

        if (!user) {

          return done(null, false, { message: 'Incorrect email' });

        }

        user.checkPassword(password, function(err, isMatch) {

          if (err) {

            return done(err);

          }

          if (!isMatch) {

            return done(null, false, { message: 'Incorrect password.' });

          }

          return done(null, user);
      
        });

      } catch (err) {
        
        done(err); 

      }
       
    }));

}