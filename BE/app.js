const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('express-async-errors');
var cors = require('cors');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/login.config');
const authMdw = require('./middlewares/authen.mdw');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// Passport session setup. 
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

passport.use(new FacebookStrategy({
    clientID: config.facebook_key,
    clientSecret: config.facebook_secret,
    callbackURL: config.callback_url
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log(accessToken, refreshToken, profile, done);
        return done(null, profile);
      });
    }
  ));
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body để get data
app.use(session({ secret: 'keyboard cat', key: 'sid' }));  //Save user login
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`listening port ${PORT}`);
});