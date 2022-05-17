var express = require('express');
var router = express.Router();

const routerV1 = require('./v1/router');

router.use('/v1', routerV1);

module.exports = router;
