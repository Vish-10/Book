const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport)  {
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({username: username}, (err, user) =>{
                if(err) throw err;
                if(!user) return done(null, false, {message:'username not found'});
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result === true){
                        return done(null, user);
                    }
                    else{
                        return done(null, false, {message:'password incorrect'});
                    }
                });
            });
        })
    ); 

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({_id: id}, (err, user) => {
            cb(err, user);
        });
    });
};

/*var passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) throw err;
        if(result === true){
            return done(null, user);
        }
        else{
            return done(null, false, { message: 'Incorrect password.' });
        }
    });
    });
  }
));

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
      console.log('deserialized called');
    User.findById(id, function(err, user) {
        console.log(user + err);
      done(err, user);
    });
  });

  module.exports = passport;*/