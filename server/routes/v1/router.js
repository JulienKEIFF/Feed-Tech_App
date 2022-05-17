const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/auths.js'));
router.use('/feed', require('./feed/feeds.js'));
router.use('/user', require('./user/users.js'));
router.use('/group', require('./group/group.js'));

module.exports = router;
