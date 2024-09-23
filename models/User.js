const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },   // Required field
    address: { type: String, required: true }, // Required field
    contact: { type: String, required: true }  // Required field
});

module.exports = mongoose.model('User', userSchema);
