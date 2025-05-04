import React from 'react';
import './ticketquantity.css';
import { useCartStore } from '../../store/cartStore';

function TicketQuantity({ item, setTicketCount, price, hidePrice = false, customClass = '' }) {
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const isControlled = typeof setTicketCount === 'function';

  const handleIncrease = () => {
    if (isControlled) {
      setTicketCount(prev => prev + 1);
    } else {
      updateItemQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (isControlled) {
      setTicketCount(prev => Math.max(0, prev - 1));
    } else {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  const displayQuantity = isControlled ? item : item.quantity;
  const displayPrice = isControlled ? price : item.price;
  const displayTotal = displayPrice * displayQuantity;

  return (
    <div className={`ticket__quantity-container ${customClass}`}>
      {!hidePrice && (
        <div className="ticket__price">
          <p>{displayTotal} sek</p>
        </div>
      )}
      <div className="ticket__quantity">
        <button onClick={handleDecrease} className="decrease-btn">−</button>
        <span>{displayQuantity}</span>
        <button onClick={handleIncrease} className="increase-btn">+</button>
      </div>
    </div>
  );
}

export default TicketQuantity;