import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  removeCartItem,
  updateCartItem,
  clearCartItems,
} from "../api";

const ShoppingCartPage = ({ cartItems, setCartItems }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  // Handle removing a cart item
  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
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
      await updateCartItem(itemId, quantity);
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
      clearCartItems([]);
      setCartItems([]);
      navigate("/order");
    } catch (error) {
      console.error(error);
    }
  };

  const checkDisablity = () => {
    if (
      cartItems[0] &&
      email.length > 0 &&
      phoneNumber.length > 0 &&
      address.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const isButtonDisabled = checkDisablity();
  return (
    <>
      <h1 className="main-title">Shopping Cart</h1>
      <ul>
        {cartItems.map((item, idx) => (
          <li className="shopping-cart-item" key={idx}>
            <div>
              <span className="item-title">Good name: </span>
              {item.name}
            </div>
            <div>
              <span className="item-title">Price: </span>
              {item.price}$
            </div>

            <div>
              {" "}
              <span className="item-title">Type amount: </span>
              <input
                className="amount-input"
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item._id, e.target.value)}
              />
            </div>

            <button
              className="btn btn-remove"
              onClick={() => handleRemoveItem(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <form className="form">
        <input
          className="form-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="form-input"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          className="form-input"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </form>{" "}
      <button
        disabled={checkDisablity()}
        className="btn btn-order"
        onClick={handleSubmitOrder}
      >
        Submit Order
      </button>
      {isButtonDisabled && (
        <p className="warning">
          Please make an order and fill in all the fields in the form.
        </p>
      )}
    </>
  );
};

export default ShoppingCartPage;
