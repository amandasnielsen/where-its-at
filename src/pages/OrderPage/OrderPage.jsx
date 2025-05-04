import React from 'react';
import { useCartStore } from '../../store/cartStore';
import TicketButton from '../../components/TicketButton/TicketButton';
import NavButtons from '../../components/NavButtons/NavButtons';
import './orderpage.css';
import TicketQuantity from '../../components/TicketQuantity/TicketQuantity';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = () => {
    // Skapa en lista med biljetter (en för varje kvantitet)
    const allTickets = cart.flatMap(item =>
      Array.from({ length: item.quantity }, () => ({ ...item }))
    );
  
    // Navigera till TicketsPage och skicka med biljetterna via state
    navigate('/tickets', { state: { tickets: allTickets } });

    clearCart(); // Rensa varukorgen om du vill
  };

  return (
    <div className="order__page">
      <h1>Order</h1>
      {cart.length === 0 ? (
       <p style={{ color: 'white', fontFamily: 'FiraSans', marginTop: '2rem' }}>Your cart is empty 😎</p>
      ) : (
        <div className="order__list">
          {cart.map(item => {
            const eventDate = new Date(item.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const formattedDate = `${day} ${month}`;

            return (
              <div key={item.id} className="order__item">
                <div className="order__item-top">
                  <h3 className="order__item-name">{item.name}</h3>
                  <p className="order__item-time">
                    {formattedDate} kl {item.from} - {item.to}
                  </p>
                </div>
                <div className="order__item-bottom">
                  <TicketQuantity 
                    item={item}
                    hidePrice={true}
                    customClass="order__page-counter"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="order__total-amount">
          <h3 className="order__total-text">Total amount for your order</h3>
          <h3 className="order__total-price">{totalPrice} sek</h3>
      </div>
      <TicketButton 
        onClick={handleSubmit}
        text="Buy tickets" 
        className="button__order"
      />
      <NavButtons />
    </div>
  );
}

export default OrderPage;
