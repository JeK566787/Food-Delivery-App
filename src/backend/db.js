const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://JeK:Pass12345!@clusternew.wlbfc3m.mongodb.net/food_delivery_db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const shopSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      name: String,
      price: Number,
    },
  ],
});

const cartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  shopId: Number,
  quantity: String,
});

const orderSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  address: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  ],
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
const Shop = mongoose.model("Shop", shopSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Shop,
  Order,
  CartItem,
};
