const express = require('express');
const router = express.Router();

const FeedItem = require('../../../schemes/rssItem.scheme');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const limit = req?.query?.limit || 10;
  const feeds = await FeedItem.find({}).limit(limit);

  res.json(feeds);
});

router.get('/recent', async (req, res, next) => {
  const limit = req?.query?.limit || 10;
  const feeds = await (await FeedItem.find({}, [], {sort: {isoDate: -1}, limit: limit}));

  res.json(feeds);
});

module.exports = router;