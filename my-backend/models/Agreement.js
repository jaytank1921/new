// src/models/Agreement.js
const mongoose = require('mongoose');

const AgreementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    propertyType: { type: String, required: true },
    doc: { type: String, required: true }, // Store the path to the uploaded PDF
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Agreement', AgreementSchema);
