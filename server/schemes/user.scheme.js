const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchemas = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: String,
    lastConnexion: String,
    role: String,
});

module.exports = mongoose.model('User', userSchemas);