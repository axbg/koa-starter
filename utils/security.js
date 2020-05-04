const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('../config');
const service = require('../services').authentication;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

const callbackHandler = async (accessToken, refreshToken, profile, done) => {
    const userId = await service.getOrCreateUserId(profile);
    done(null, userId);
};

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET,
    callbackURL: "/api/authentication/"
}, callbackHandler));

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret: config.FACEBOOK_SECRET,
    callbackURL: "/api/authentication/"
}, callbackHandler));

module.exports = passport;