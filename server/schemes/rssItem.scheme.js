const mongoose = require('mongoose');
const { Schema } = mongoose;

const rssItemScheme = new Schema({
    feedURL: String,
    title: { type: String, required: true },
    link: { type: String, required: true, unique: true },
    pubDate: String,
    creator: String,
    content: String,
    contentSnippet: String,
    guid: String,
    categories: Array,
    isoDate: String,
});

module.exports = mongoose.model('Rss_Item', rssItemScheme);