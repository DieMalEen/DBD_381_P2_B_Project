const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
        user_id: {
        type: String,
        required: true
    },
    products: [
        {
            product_id: String,
            quantity: Number,
            price: Number
        }
    ],
    order_total: Number,
    order_status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'canceled'],
        default: 'pending'
    },
    order_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('orders', orderSchema);