import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ShopsPage from "./pages/ShopsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import OrdersPage from "./pages/OrdersPage";
import "./styles/App.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="container">
      <nav>
        <ul className="nav-bar">
          <li>
            <Link className="nav-link" to="/">
              Shops
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/cart">
              Shopping Cart
            </Link>
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
        <Route path="/order" element={<OrdersPage />} />
      </Routes>
    </div>
  );
};

export default App;
