import React, { useState } from 'react';
import './ticketquantity.css';

function TicketQuantity({ event, ticketCount, setTicketCount }) {
  const handleIncrease = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleDecrease = () => {
    if (ticketCount > 0) {
      setTicketCount(ticketCount - 1);
    }
  };

  const totalPrice = ticketCount * event.price;

  return (
    <div className="ticket__quantity-container">
      	<div className="ticket__price">
	  		<p>{totalPrice} sek</p>
		</div>
        <div className="ticket__quantity">
          <button onClick={handleDecrease} className="decrease-btn">-</button>
          <span>{ticketCount}</span>
          <button onClick={handleIncrease} className="increase-btn">+</button>
        </div>
    </div>
  );
}

export default TicketQuantity;
