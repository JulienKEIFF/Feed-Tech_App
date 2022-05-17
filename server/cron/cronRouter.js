const express = require('express');
const router = express.Router();

const { updateRssFeed } = require('../cron/updateRssFeed.cron');

router.get('/update', async (req, res, next) => {
    console.log('starting update');
    try { 
        const updated = await updateRssFeed();
        res.json({return: 'done', updated})
    } catch (err) {
        res.json({return: 'error', err});
    }
});

module.exports = router;
