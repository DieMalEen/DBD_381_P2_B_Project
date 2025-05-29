const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: Number,
    product_category: String,
    product_stock: Number,
    product_rating: {
        type: Number,
        default: 0
    },
    provider_id: String,
    product_images: [String],
    product_produced: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('products', ProductSchema);