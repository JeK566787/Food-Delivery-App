import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ShopsPage from "./ShopsPage";
import ShoppingCartPage from "./ShoppingCartPage";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Shops</Link>
          </li>
          <li>
            <Link to="/cart">Shopping Cart</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          cartItems={cartItems}
          setCartItems={setCartItems}
          path="/"
          element={
            <ShopsPage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route
          path="/cart"
          element={
            <ShoppingCartPage
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
