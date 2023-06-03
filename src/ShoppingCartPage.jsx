import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  removeCartItem,
  updateCartItem,
  submitOrder,
  clearCartItems,
} from "./api"; // Assuming you have API functions for interacting with the backend

const ShoppingCartPage = ({ cartItems, setCartItems }) => {
  // const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // Fetch cart items from the server or local storage
  // You can implement this function using the appropriate API function
  // For example: useEffect to fetch cart items from the server when the page loads
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems(); // Replace with the appropriate API function
        setCartItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  // Handle removing a cart item
  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId); // Replace with the appropriate API function
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handle updating the quantity of a cart item
  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await updateCartItem(itemId, quantity); // Replace with the appropriate API function
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item._id === itemId) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handle submitting the order
  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        email,
        phoneNumber,
        address,
        items: cartItems.map((item) => item),
      };
      await axios.post("http://localhost:3001/api/orders", orderData);
      // await submitOrder(orderData); // Replace with the appropriate API function
      clearCartItems([]);
      setCartItems([]); // You can also clear the cart items here
      navigate("/"); // Redirect to the home page or order confirmation page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item._id, e.target.value)}
            />
            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <button onClick={handleSubmitOrder}>Submit Order</button>
      </div>
    </>
  );
};

export default ShoppingCartPage;
