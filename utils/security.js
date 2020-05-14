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

const computePictureUrl = (profile) => {
    return profile._json.picture || "https://graph.facebook.com/" + profile.id + "/picture?type=large";
}

const callbackHandler = async (accessToken, refreshToken, profile, done) => {
    const user = await service.getOrCreateUser({
        email: profile._json.email,
        firstname: profile._json.first_name || profile._json.given_name,
        lastname: profile._json.last_name || profile._json.family_name,
        picture: computePictureUrl(profile)
    });

    done(null, user);
};

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_SECRET,
    callbackURL: "/api/authentication/google/callback/"
}, callbackHandler));

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret: config.FACEBOOK_SECRET,
    callbackURL: "/api/authentication/facebook/callback/",
    profileFields: ['email', 'name']
}, callbackHandler));

module.exports = passport;