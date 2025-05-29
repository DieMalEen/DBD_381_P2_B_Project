const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_role: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    },
    user_address: {
        city: String,
        country: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);