const axios = require('axios');
const Parser = require('rss-parser');

const Cron = require('../schemes/cron.scheme');
const RssFeed = require('../schemes/rssfeed.scheme');
const RssItem = require('../schemes/rssItem.scheme');

const parser = new Parser();


async function updateRssFeed() {
    let haveUpdate = false;
    const feedToParse = await RssFeed.find({});

    feedToParse.forEach(async (feed) => {
        const parsedFeed = await parser.parseURL(feed.rssLink);
        
        parsedFeed.items.forEach(async (item) => {
            
            const findRssItem = await RssItem.find({ link: item.link });
            if (findRssItem.length != 0) return; 

            const rssItem = await RssItem.create({
                feedURL: feed.rssLink,
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                creator: item.creator,
                content: item.content,
                contentSnippet: item.contentSnippet,
                guid: item.guid,
                categories: item.categories,
                isoDate: item.isoDate,
            });
            await rssItem.save();
            haveUpdate = true;
        });
    });

    return haveUpdate;
}

module.exports = {
    updateRssFeed,
}