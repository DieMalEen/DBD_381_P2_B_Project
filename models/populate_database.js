const mongoose = require('mongoose');
const Product = require('./models/products');
const User = require('./models/users');
const Order = require('./models/orders');
const Category = require('./models/categories');
const Review = require('./models/reviews');

const MONGO_URI = "mongodb://localhost:27017/ecommerce"; // Update if using replica set URI

async function populate() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // --- Categories ---
    const categories = [];
    for (let i = 1; i <= 10; i++) {
      categories.push(new Category({ name: `Category ${i}` }));
    }
    const savedCategories = await Category.insertMany(categories);

    // --- Users ---
    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push(new User({
        user_id: `U900${i}`,
        user_name: `User ${i}`,
        user_email: `user${i}@example.com`,
        user_role: i % 2 === 0 ? 'seller' : 'buyer',
        user_address: {
          city: `City ${i}`,
          country: "South Africa"
        }
      }));
    }
    const savedUsers = await User.insertMany(users);

    // --- Products ---
    const products = [];
    for (let i = 1; i <= 10; i++) {
      products.push(new Product({
        product_id: `P100${i}`,
        product_name: `Product ${i}`,
        product_description: `Description for product ${i}`,
        product_price: 100 + i,
        product_category: savedCategories[i % 10]._id,
        product_quantity: 10 + i,
        image_url: `product${i}.jpg`,
        reviews: []
      }));
    }
    const savedProducts = await Product.insertMany(products);

    // --- Orders ---
    const orders = [];
    for (let i = 1; i <= 10; i++) {
      orders.push(new Order({
        order_id: 8000 + i,
        customer: savedUsers[i % 10]._id,
        products: [{
          product: savedProducts[i % 10]._id,
          quantity: 1 + i,
          price: savedProducts[i % 10].product_price
        }],
        totalAmount: (1 + i) * savedProducts[i % 10].product_price
      }));
    }
    const savedOrders = await Order.insertMany(orders);

    // --- Reviews ---
    const reviews = [];
    for (let i = 1; i <= 10; i++) {
      reviews.push(new Review({
        review_id: `R100${i}`,
        product: savedProducts[i % 10]._id,
        user: savedUsers[i % 10]._id,
        rating: (i % 5) + 1,
        comment: `This is review ${i} for product ${i % 10}`
      }));
    }
    await Review.insertMany(reviews);

    console.log("Database populated with 10 items each.");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error populating database:", err);
    await mongoose.disconnect();
  }
}

populate();