import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopsPage = ({ cartItems, setCartItems }) => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  // const [cartItems, setCartItems] = useState([]);

  console.log(cartItems);

  // Fetch the list of shops from the server
  useEffect(() => {
    fetchShops();
  }, []);

  // // Retrieve cart from local storage when component mounts
  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);

  // // Save the cart to local storage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

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

  const handleAddToCart = async (cartItem) => {
    // const goodJSON = JSON.stringify(good);
    // console.log(goodJSON);
    try {
      // Send the cart data to the server
      await axios.post("http://localhost:3001/api/cartitems", cartItem);
      // Update the cart state in the Redux store if needed
      setCartItems((prevCart) => [...prevCart, cartItem]);
    } catch (error) {
      console.error(`Post didnt work: ${error}`);
    }
  };

  // const handleAddToCart = (good) => {
  //   setCart([...cart, good]);
  // };

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
                <button onClick={() => handleAddToCart(good)}>
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
