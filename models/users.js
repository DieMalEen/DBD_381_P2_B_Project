// users Schema
const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },

    user_name: {
        type: String,
        required: true,
        unique: true
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
        street: String,
        city: String,
        postal_code: String
    },

    created_date: {
        type: Date,
        default: Date.now
    },

    order_history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }]
});

// Index: unique user_id
userSchema.index({ user_id: 1 });

module.exports = mongoose.model('users', userSchema);