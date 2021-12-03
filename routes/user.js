const Router = require('koa-router');
const controller = require('../controllers').user;
const passport = require('../configurations/security');

const {authenticated} = require('../middlewares').authentication;

const router = new Router();

router.post('/login/local', controller.login);

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/login/google/callback', passport.authenticate('google'), (ctx) => {
  ctx.redirect('/');
});

router.get('/login/facebook/callback', passport.authenticate('facebook'), (ctx) => {
  ctx.redirect('/');
});

// protecting individual routes
router.get('/logout', authenticated, controller.logout);

module.exports = router;
