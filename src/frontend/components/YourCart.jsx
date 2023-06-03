const YourCart = ({ cartItems }) => {
  return (
    <div className="main-title">
      {" "}
      <h2 className="main-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              <div>
                <span className="item-title">Good name: </span>
                {item.name}
              </div>{" "}
              <div>
                <span className="item-title">Price: </span>${item.price}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourCart;
