const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({ 
    name: String,
    address_line1: String,
    city: String,
    state: String,
    zip_code: String,
});

const Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;