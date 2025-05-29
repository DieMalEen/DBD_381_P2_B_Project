// orders Schema
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
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

    total_amount: Number,
});
// Index: to query by order_id quickly
orderSchema.index({ order_id: 1 });

module.exports = mongoose.model('orders', orderSchema);