const express = require('express');
const router = express.Router();

const User = require('../../../schemes/user.scheme');
const Group = require('../../../schemes/group.scheme');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ res: 'user'});
});

router.get('/:id/group', async (req, res, next) => {
  const id = req?.params?.id;

  if (!id) {
    res.json({ error: 'id is required' });
    return;
  }

  const user = await User.findById(id);
  const groups = await Group.find({ members: user.id }, {users: 0});
  res.json(groups);
});

module.exports = router;
