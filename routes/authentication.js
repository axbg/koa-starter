const Router = require('koa-router');
const controller = require('../controllers').authentication;
const passport = require('../utils/security');

const router = new Router();

router.get("/google/", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/facebook/", passport.authenticate('facebook'));

router.get("/", passport.authenticate(['google', 'facebook']), (ctx) => {
    // redirect to homepage after login
    ctx.redirect("/");
});

router.get('/logout', controller.logout);

router.get('/remove-account', controller.removeAccount);

module.exports = router;