const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    contact: { type: String, required: true },
    field: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    docType: { type: String, required: true },
});

module.exports = mongoose.model('Lead', leadSchema);
