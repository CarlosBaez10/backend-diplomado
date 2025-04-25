const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id_user: {
        type: Number,
        require: true
    },
    id_profile: {
        type: Number,
        require: true
    },
    id_type_document: {
        type: Number,
        require: true
    },
    id_tag: {
        type: Number,
        require: true
    },
    id_company: {
        type: Number,
        require: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: true,
    },
    identifier: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Number,
        require: true
    },
    code: {
        type: String,
        required: true,
    },
    countryCodeId: {
        type: Number,
        require: true
    },
});


module.exports = mongoose.model('User', UserSchema, 'user');