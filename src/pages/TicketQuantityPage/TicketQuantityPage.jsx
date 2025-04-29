import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ticketquantitypage.css';
import TicketQuantity from '../../components/TicketQuantity/TicketQuantity';
import TicketButton from '../../components/TicketButton/TicketButton';

function TicketQuantityPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
	axios.get('https://santosnr6.github.io/Data/events.json')
	  .then(res => {
		console.log("RAW response:", res.data);
		const data = Array.isArray(res.data) ? res.data : res.data.events;
  
		const found = res.data.events.find(e => e.id === eventId);
		console.log("Found event:", found);
  
		setEvent(found);
	  })
	  .catch(err => {
		console.error('Error fetching event:', err);
	  });
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  const handleAddToCart = () => {
	const item = {
	  id: event.id,
	  name: event.name,
	  price: event.price,
	  quantity: ticketCount
	};
  
	const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(i => i.id === item.id);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += item.quantity;
    } else {
      existingCart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/order');
  };

  return (
    <div className="event__details">
		<h1>Event</h1>
		<p className="score-tickets">You are about to score<br></br>some tickets to</p>
		<h2 className='event__title'>{event.name}</h2>
		<p className='event__when'>{event.when.date} - {event.when.from}-{event.when.to}</p>
		<p className='event__where'>@ {event.where}</p>
		<p className='event__price'>{event.price} sek</p>
		<TicketQuantity 
			event={event} 
			ticketCount={ticketCount} 
			setTicketCount={setTicketCount}
		/>
		<TicketButton 
			onClick={handleAddToCart}
			text="Add to cart" 
			className="button__cart"
		/>
    </div>
  );
}

export default TicketQuantityPage;
