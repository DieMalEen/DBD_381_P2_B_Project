const express = require("express");
const mongoose = require("mongoose");

// Import the shcemas
const Product = require('./models/products');
const User = require('./models/users');
const Order = require('./models/orders');
const Caregory = require('./models/categories');

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
// Add product
// This is used in stress testing
app.post("/add-product", async (req, res) => {
  console.log("Received add-product request:", req.body);
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    const saved = await newProduct.save();
    res.json(saved);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(400).json({ error: err.message });
  }
});

// Add user
app.post("/add-user", async (req, res) => {
  console.log("Received add-user request:", req.body);
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(400).json({ error: err.message });
  }
});

// Add order
app.post("/add-order", async (req, res) => {
  console.log("Received add-order request:", req.body);
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(400).json({ error: err.message });
  }
});

// Delete Routes
// Delete a product by ID
app.delete("/delete-product/:id", async (req, res) => {
  try {
    const deleted = await Product.deleteOne({ product_id: req.params.id });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Deleted successfully" });
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

// Search Routes
// Shows products based on id
app.get("/search-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ product_id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search users by role
app.get("/search-users/:role", async (req, res) => {
  try {
    const role = req.params.role; // Use params instead of query
    const users = await User.find({ user_role: role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// RESET
app.get("/reset-database", async (req, res) => {
  try {
    await mongoose.connection.dropDatabase();
    res.send("Database dropped successfully. Relaunch the server to repopulate.");
  } catch (err) {
    res.status(500).json({ error: "Failed to drop database: " + err.message });
  }
});

// Cleanup route to delete all collections (use with caution in prod)
app.delete("/cleanup", async (req, res) => {
  try {
    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({}),
      Order.deleteMany({}),
      Category.deleteMany({})
    ]);
    res.status(200).send("Database cleaned");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));