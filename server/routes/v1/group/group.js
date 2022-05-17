var express = require('express');
var router = express.Router();
const Group = require('../../../schemes/group.scheme');

/* GET group listing. */
router.get('/', async (req, res, next) => {
    const allGroups = await Group.find({});
    res.json(allGroups);
});

router.put('/create', async (req, res, next) => {
    const groupName = req?.body?.name;
    const groupDescription = req?.body?.description;

    if (!groupName) {
        res.json({ error: "Missing parameters name" });
        return;
    }

    const newGroup = await Group.create({
        name: groupName,
        description: groupDescription,
        logoURL: '',
        users: [],
    });

    res.json(newGroup);
});

router.post('/join', async (req, res, next) => {
    const group = req?.body?.groupId;
    const user = req?.body?.userId;

    if (!group || !user) {
        res.json({ error: "Missing parameters" });
        return;
    }

    const groupToJoin = await Group.findById(group);
    if (!groupToJoin) {
        res.json({ error: "Group not found" });
        return;
    }

    groupToJoin.users.push(user);
    await groupToJoin.save();

    res.json(groupToJoin);
});

module.exports = router;
