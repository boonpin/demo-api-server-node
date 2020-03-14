const express = require('express');
const router = express.Router();
const controller = require('../../app/http/controllers/api/general');

const jwt = require('../../app/http/middlewares/jwt');

router.route('/info').get(jwt, controller.info);
router.route('/products').get(jwt, controller.products);

module.exports = router;
