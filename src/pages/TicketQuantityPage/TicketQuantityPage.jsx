import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import axios from 'axios';
import './ticketquantitypage.css';
import TicketQuantity from '../../components/TicketQuantity/TicketQuantity';
import TicketButton from '../../components/TicketButton/TicketButton';
import NavButtons from '../../components/NavButtons/NavButtons';

function TicketQuantityPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
	axios.get('https://santosnr6.github.io/Data/events.json')
	  .then(res => {
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
	  location: event.where,
	  quantity: ticketCount,
	  date: event.when.date,
	  from: event.when.from,
	  to: event.when.to
	};
  
	const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
	const existingIndex = existingCart.findIndex(i => i.id === item.id);
  
	if (existingIndex !== -1) {
	  existingCart[existingIndex].quantity += item.quantity;
	} else {
	  existingCart.push(item);
	}
  
	addToCart(item);
	
	// Lägg till state här för att skicka event- och ticket-information till order-sidan
	navigate('/order', {
	  state: { 
		event,  // Skicka hela eventet inklusive where
		tickets: existingCart  // Skicka med en lista över biljetterna (eller de som har lagts till)
	  }
	});
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
			item={ticketCount}
			setTicketCount={setTicketCount}
			price={event.price}
		/>
		<TicketButton 
			onClick={handleAddToCart}
			text="Add to cart" 
			className="button__cart"
		/>
		<NavButtons />
    </div>
  );
}

export default TicketQuantityPage;
