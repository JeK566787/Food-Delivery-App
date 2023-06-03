import React, { useState, useEffect } from "react";
import axios from "axios";
import YourCart from "../components/YourCart";

const ShopsPage = ({ cartItems, setCartItems }) => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

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
        return;
      }
      const cartItem = {
        name: good.name,
        price: good.price,
        shopId: good.shopId,
      };

      await axios.post("http://localhost:3001/api/cartitems", cartItem);

      setCartItems((prevCart) => [...prevCart, cartItem]);
    } catch (error) {
      console.error(`Post didnt work: ${error}`);
    }
  };

  return (
    <div>
      {}
      {selectedShop ? (
        <div>
          <h1 className="main-title">Choose Goods</h1>
          <h2>{selectedShop.name}</h2>
          {!selectedShop && <p>{selectedShop.description}</p>}
          <ul>
            {selectedShop.goods.map((good, idx) => (
              <li className="shopping-cart-item" key={idx}>
                <div>
                  <span className="item-title">Good name: </span>
                  {good.name}
                </div>
                <div>
                  <span className="item-title">Price: </span>
                  {good.price}$
                </div>

                <button
                  className="btn btn-addCart"
                  disabled={cartItems.some((item) => item.name === good.name)} // Disable the button if the item is already in the cart
                  onClick={() => handleAddToCart(good)}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
          <button className="btn" onClick={() => setSelectedShop(null)}>
            Back to Shops
          </button>
        </div>
      ) : (
        <div>
          <h1 className="main-title ">Choose Shop</h1>
          {shops.map((shop, idx) => (
            <div key={idx} className="shop-container test">
              <h2>{shop.name}</h2>
              <p>{shop.description}</p>
              <button
                className="btn btn-selectShop"
                onClick={() => handleShopSelect(shop)}
              >
                Select Shop
              </button>
            </div>
          ))}
        </div>
      )}
      <YourCart cartItems={cartItems} />
    </div>
  );
};

export default ShopsPage;
