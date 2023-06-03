const express = require("express");
const cors = require("cors");
const { Shop, Order, CartItem } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.get("/api/shops", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { email, phoneNumber, address, items } = req.body;
    const order = new Order({
      email,
      phoneNumber,
      address,
      items,
    });
    await order.save();
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve orders." });
  }
});

app.get("/api/cartitems", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/cartitems", async (req, res) => {
  try {
    const { id, name, price, shopId, quantity } = req.body;
    const cartItem = new CartItem({ id, name, price, shopId, quantity });
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/cartitems/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    await CartItem.findByIdAndDelete(itemId);
    res.json({ message: "Cart item deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/cartitems", async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.json({ message: "Cart items cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/cartitems/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    await CartItem.findByIdAndUpdate(itemId, { quantity });
    res.json({ message: "Cart item updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
