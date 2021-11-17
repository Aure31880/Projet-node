const mongoose = require('mongoose');
const singleValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.plugin(singleValidator);

module.exports = mongoose.model('User', UserSchema);