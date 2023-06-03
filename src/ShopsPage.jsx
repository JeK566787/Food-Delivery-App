import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopsPage = ({ cartItems, setCartItems }) => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  console.log(cartItems);

  // Fetch the list of shops from the server
  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/shops");
      setShops(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
  };

  const handleAddToCart = async (good) => {
    try {
      const cartItemExists = cartItems.some((item) => item.name === good.name);
      if (cartItemExists) {
        // Item is already in the cart, disable the button
        return;
      }
      const cartItem = {
        name: good.name,
        price: good.price,
        shopId: good.shopId,
      };
      // Send the cart data to the server
      await axios.post("http://localhost:3001/api/cartitems", cartItem);
      // Update the cart state in the Redux store if needed
      setCartItems((prevCart) => [...prevCart, cartItem]);
    } catch (error) {
      console.error(`Post didnt work: ${error}`);
    }
  };

  return (
    <div>
      <h1>Shops</h1>
      {selectedShop ? (
        <div>
          <h2>{selectedShop.name}</h2>
          <p>{selectedShop.description}</p>
          <ul>
            {selectedShop.goods.map((good, idx) => (
              <li key={idx}>
                {good.name} - ${good.price}
                <button
                  disabled={cartItems.some((item) => item.name === good.name)} // Disable the button if the item is already in the cart
                  onClick={() => handleAddToCart(good)}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedShop(null)}>Back to Shops</button>
        </div>
      ) : (
        shops.map((shop, idx) => (
          <div key={idx}>
            <h2>{shop.name}</h2>
            <p>{shop.description}</p>
            <button onClick={() => handleShopSelect(shop)}>Select Shop</button>
          </div>
        ))
      )}
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShopsPage;
