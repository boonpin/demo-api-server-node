const router = require('express').Router();

const controller = require('../../app/http/controllers/api/auth');

router.post('/login', controller.doLogin);
router.get('/logout', controller.logout);
router.get('/user', controller.getUser);
router.post('/refresh-token', controller.refreshToken);

module.exports = router;
