const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            require: true
        },
        manufacturer: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        mainPepper: {
            type: String,
            require: true
        },
        imageUrl: {
            type: String,
            require: true
        },
        heat: {
            type: Number,
            require: true
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        usersLiked: {
            type: Array,
            default: [],
            require: true
        },
        usersDisliked: {
            type: Array,
            default: [],
            require: true
        }
    });

module.exports = mongoose.model('Sauce', SauceSchema);