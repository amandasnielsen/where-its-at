import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { fetchEvents } from '../../api';
import './ticketquantitypage.css';
import TicketQuantity from '../../components/TicketQuantity/TicketQuantity';
import TicketButton from '../../components/TicketButton/TicketButton';
import NavButtons from '../../components/NavButtons/NavButtons';

function TicketQuantityPage() {
  const { eventId } = useParams(); // Getting eventID from url-parameters
  const [event, setEvent] = useState(null); // State to store event-information
  const [ticketCount, setTicketCount] = useState(1); // State to keep track of ticket-quanitity
  const addToCart = useCartStore((state) => state.addToCart); // Function from global state to adding tickets to cart
  const navigate = useNavigate();

  // Getting events-information from API
  useEffect(() => {
    fetchEvents()
      .then((data) => {
        const foundEvent = data.find(e => e.id === eventId);
        console.log("Found event:", foundEvent);
        setEvent(foundEvent);
      })
      .catch((err) => {
        console.error('Error fetching event:', err);
      });
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  // When adding tickets to cart, this function runs
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
  
	// Adding tickets to cart via cartStore
	addToCart(item);
  
	// Send to order-page with event and ticket-information
	navigate('/order', {
	  state: { 
		event,
		tickets: [item]  // Send the list with tickets just added
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
		/>
		<NavButtons />
    </div>
  );
}

export default TicketQuantityPage;
