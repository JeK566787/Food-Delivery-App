import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ShopsPage from "./ShopsPage";
import ShoppingCartPage from "./ShoppingCartPage";

import "./styles/App.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="container">
      <nav>
        <ul className="nav-bar">
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
    </div>
  );
};

export default App;
