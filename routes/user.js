const Router = require('koa-router');
const controller = require('../controllers').user;
const passport = require('../configurations/security');

const authenticationMiddleware = require('../middlewares').authentication.authenticated;

const router = new Router();

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/login/google/callback', passport.authenticate('google'), (ctx) => {
  ctx.redirect('/');
});

router.get('/login/facebook/callback', passport.authenticate('facebook'), (ctx) => {
  ctx.redirect('/');
});

router.get('/logout', authenticationMiddleware, controller.logout);

module.exports = router;
