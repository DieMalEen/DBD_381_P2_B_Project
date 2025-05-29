const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review_id: {
        type: String,
        required: true,
        unique: true
    },
    product_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String,
        created_at: {
        type: Date,
        default: Date.now
  }
});

module.exports = mongoose.model('reviews', reviewSchema);