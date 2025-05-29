// products Schema
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

    product_description: {
        type: String,
        default: "No description provided"
    },

    product_price: {
        type: Number, 
        required: true,
    },

    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },

    product_quantity: {
        type: Number,
        default: 0
    },

    image_url: {
        type: String,
        default: "No image provided"
    },

    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        type: String,
        rating: Number,
    }],
});

// Index: to query by product_id quickly
ProductSchema.index({ product_id: 1 });

module.exports = mongoose.model('products', ProductSchema);