import { useEffect, useState } from 'react';
import './orderpage.css';

function OrderPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(stored);
  }, []);

  if (cartItems.length === 0) return <p>Varukorgen är tom.</p>;

  return (
    <div className="order__page">
      <h1>Order</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="order__item">
          <p>{item.name}</p>
          <p>Antal: {item.quantity}</p>
          <p>Pris: {item.price} sek</p>
          <p>Totalt: {item.price * item.quantity} sek</p>
        </div>
      ))}
    </div>
  );
}

export default OrderPage;