const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    profile: {
        type: Number,
        require: true
    },
    module: {
        type: Number,
        require: true
    },
});


module.exports = mongoose.model('Permissions', UserSchema, 'permissions');