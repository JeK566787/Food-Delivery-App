import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/orders");

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="main-title">Orders</h1>
      {orders.map((order) => (
        <div key={order._id}>
          <h3 className="item-title">Order number: {order._id}</h3>
          <p className="item-title">Email: {order.email}</p>
          <p className="item-title">Phone Number: {order.phoneNumber}</p>
          <p className="item-title">Address: {order.address}</p>
          <ul>
            {order.items.map((item) => (
              <li className="shopping-cart-item" key={item._id}>
                <div>
                  <span className="item-title">Product Name: </span>
                  {item.name}
                </div>
                <div>
                  <span className="item-title">Price: </span>
                  {item.price}$
                </div>
                <div>
                  <span className="item-title">Quantity: </span>
                  {item.quantity}
                </div>
                <div>
                  <span className="item-title">Shop number: </span>
                  {item.shopId}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link className="btn" to="/">
        Back
      </Link>
    </div>
  );
};

export default OrdersPage;
