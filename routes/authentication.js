const Router = require('koa-router');
const controller = require('../controllers').authentication;
const passport = require('../configurations/security');

const router = new Router();

router.get('/google/', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/facebook/', passport.authenticate('facebook', {scope: ['email']}));

router.get('/google/callback', passport.authenticate('google'), (ctx) => {
  ctx.redirect('/');
});

router.get('/facebook/callback', passport.authenticate('facebook'), (ctx) => {
  ctx.redirect('/');
});

router.get('/logout', controller.logout);

module.exports = router;
