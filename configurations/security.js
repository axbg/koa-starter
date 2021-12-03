const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET,
} = require('../properties');
const service = require('../services').user;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const computePictureUrl = (profile) => {
  return profile._json.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
};

const callbackHandler = async (accessToken, refreshToken, profile, done) => {
  const user = await service.getOrCreateUser({
    email: profile._json.email,
    firstname: profile._json.first_name || profile._json.given_name,
    lastname: profile._json.last_name || profile._json.family_name,
    picture: computePictureUrl(profile),
  });

  done(null, user);
};

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: '/api/user/login/google/callback/',
}, callbackHandler));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_SECRET,
  callbackURL: '/api/user/login/facebook/callback/',
  profileFields: ['email', 'name'],
}, callbackHandler));

module.exports = passport;
