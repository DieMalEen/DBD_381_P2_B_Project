// orders Schema
const mongoose = require('mongoose');
const products = require('./products');
const users = require('./users');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true,
        unique: true
    },

    customer: {
        type: mongoose.Schema.Types.Objectid, 
        ref: users, 
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: products,
                required: true
            },
            quantity: Number,
            price: Number
        }
    ],

    order_date: {
        type: Date,
        default: Date.now
    },

    totalAmount: Number,
});
// Index: to query by order_id quickly
orderSchema.index({ order_id: 1 });

module.exports = mongoose.model('orders', orderSchema);