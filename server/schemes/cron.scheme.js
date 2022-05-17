const mongoose = require('mongoose');
const { Schema } = mongoose;

const cronScheme = new Schema({
    name: { type: String, required: true, unique: true },
    lastRun: Number,
    delay: Number,
});

module.exports = mongoose.model('Cron', cronScheme);