const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupScheme = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    logoURL: String,
    users: Array,
});

module.exports = mongoose.model('Group', groupScheme);