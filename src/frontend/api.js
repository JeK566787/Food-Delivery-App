import axios from "axios";

export const getCartItems = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/cartitems");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch cart items: " + error.message);
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/cartitems/${itemId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove cart item");
    }
  } catch (error) {
    throw new Error("Failed to remove cart item: " + error.message);
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/cartitems/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update cart item quantity");
    }
  } catch (error) {
    throw new Error("Failed to update cart item quantity: " + error.message);
  }
};

export const clearCartItems = async () => {
  try {
    const response = await axios.delete("http://localhost:3001/api/cartitems");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to clear cart items.");
  }
};

export const submitOrder = async (orderData) => {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Failed to submit order");
    }
  } catch (error) {
    throw new Error("Failed to submit order: " + error.message);
  }
};
