const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    clientSecret: {
        type: String,
        required: true
    },
    scopes: {
        type: [String]
    },
    redirectUrl: {
        type: String,
        required: true
    }
});

module.exports = model('Client', ClientSchema, 'clients');