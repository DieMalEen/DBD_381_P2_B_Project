const express = require("express");
const mongoose = require("mongoose");

//Import the shcemas
const Product = require('./models/products');
const User = require('./models/users');
const Order = require('./models/orders');
const Review = require('./models/reviews');

const app = express();
app.use(express.json());

//Connect to MongoDB
mongoose.connect("mongodb://localhost:27100,localhost:27101,localhost:27102/ecommerce?replicaSet=rs0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed", err));

//Routes

app.get("/", (req, res) => {
    res.send("E-commerce API is running");
});

app.get("/add-product", async (req, res) => {
  const sample_Product = new Product({
    product_id: "P2002",
    product_name: "Bluetooth Keyboard",
    product_price: 499.99,
    product_ategory: "electronics",
    product_stock: 30,
    seller_id: "U2020",
    product_images: ["keyboard1.jpg"]
  });
  try {
    const saved = await sample_Product.save();
    res.json(saved);
  } catch (err){
    res.status(400).json({error: err.message});
  }

});

app.get("/add-user", async (req, res) => {
  const sample_User = new User({
    user_id: "U9001",
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

app.get("/add-order", async (req, res) => {
  const sample_Order = new Order({
    order_id: "O8001",
    user_id: "U9001",
    products: [
      {
        product_id: "P2002",
        quantity: 2,
        price: 499.99
      }
    ],
    order_total: 999.98,
    order_status: "pending"
  });
  try{
    const savedOrder = await sample_Order.save();
    res.json(savedOrder); 
  } catch(err) {
    res.status(400).json({error: err.message});
  }

});

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
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));