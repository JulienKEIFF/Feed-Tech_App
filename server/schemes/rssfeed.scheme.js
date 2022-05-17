const mongoose = require('mongoose');
const { Schema } = mongoose;

const rssfeedschema = new Schema({
    rssLink: { type: String, required: true, unique: true },
    rssDisplayName: { type: String, required: true, unique: true },
    language: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('Rss_Feed', rssfeedschema);