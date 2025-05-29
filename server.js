const express = require("express");
const mongoose = require("mongoose");

// Import the shcemas
const Product = require('./models/products');
const User = require('./models/users');
const Order = require('./models/orders');
const Review = require('./models/categories');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27100,localhost:27101,localhost:27102/ecommerce?replicaSet=rs0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed", err));

// Routes
app.get("/", (req, res) => {
    res.send("E-commerce API is running");
});

// Add Routes
// Add sample products
app.get("/add-product", async (req, res) => {
  try {
    const sample_Product = new Product({
      product_id: "P2002",
      product_name: "Bluetooth Keyboard",
      product_price: 499.99,
      product_category: "60c72b2f9b1e8b001c9d4e9a", // Replace with actual category _id
      product_quantity: 30,
      image_url: "keyboard1.jpg",
      reviews: []
    });
    const saved = await sample_Product.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a sample user
app.get("/add-user", async (req, res) => {
  const sample_User = new User({
    user_id: "9001",
    user_name: "Alice M",
    user_email: "alice@example.com",
    user_role: "seller",
    user_address: {
      city: "Pretoria",
      country: "South Africa"
    }
  });
  try {
    const savedUser = await sample_User.save();
    res.json(savedUser);
  } catch (err){
    res.status(400).json({error: err.message});
  }

});

// Add a sample order
app.get("/add-order", async (req, res) => {
  try {
    const sample_Order = new Order({
      order_id: 8001,
      customer: "60c72b2f9b1e8b001c9d4e9b", // Replace with actual user ObjectId
      products: [
        {
          product: "60c72b2f9b1e8b001c9d4e9c", // Replace with actual product ObjectId
          quantity: 2,
          price: 499.99
        }
      ],
      total_amount: 999.98
    });

    const savedOrder = await sample_Order.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a review for a product
app.get('/add-review', async (req, res) => {
  const sample_Review = new Review({
    review_id: "R5001",
    product_id: "P2002",
    user_id: "U9001",
    rating: 5,
    comment: "Absolutely love this keyboard!"
  });
  try{
    const savedReview = await sample_Review.save();
    res.json(savedReview);
  } catch(err) {
    res.status(400).json({error: err.message});
  }
});

// Delete Routes
// Delete a product by ID
app.delete("/delete-product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user by ID
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an order by ID
app.delete("/delete-order/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a review by ID
app.delete('/delete-review/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Search Routes
// Search product by name
app.get("/search-product", async (req, res) => {
  try {
    const query = req.query.name;
    const products = await Product.find({ product_name: new RegExp(query, 'i') });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search users by role
app.get("/search-user", async (req, res) => {
  try {
    const role = req.query.role;
    const users = await User.find({ user_role: role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// Join Routes
// Get orders with full user and product details
app.get("/orders/details", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products with category and user reviews
app.get("/products/details", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("product_category")
      .populate("reviews.user");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));