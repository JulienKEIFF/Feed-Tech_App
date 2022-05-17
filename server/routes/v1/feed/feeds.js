const express = require('express');
const router = express.Router();

const Feed = require('../../../schemes/rssfeed.scheme');
const FeedItem = require('../../../schemes/rssItem.scheme');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const feeds = await Feed.find({});
    res.json(feeds);
});

router.put('/add', async (req, res, next) => {
    const feedURL = req?.body?.feedURL;
    const feedName = req?.body?.feedName;
    const feedLanguage = req?.body?.language;

    if (!feedURL || !feedName) {
        res.json({ error: 'feedURL and feedName are required' });
        return;
    }

    const feed = await Feed.create({
        rssLink: feedURL,
        rssDisplayName: feedName,
        language: feedLanguage,
    });

    res.json(feed);
});

router.get('/:id', async (req, res, next) => {
    const id = req?.params?.id;
    const limit = req?.query?.limit || 10;

    if (!id) {
        res.json({ error: 'id is required' });
        return;
    }

    const feed = await Feed.findById(id);
    const items = await FeedItem.find({ feedURL: feed.rssLink }).sort({ isoDate: -1 }).limit(limit);
    res.json(items);
});

module.exports = router;
