import { useEffect, useState } from 'react';
import { fetchEvents } from '../../api';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ticket.css';

// Generates a unique barcode, using letters and then font LibreBarcode
function generateBarcode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function Ticket() {
  const [event, setEvent] = useState(null); // State for storing events
  const [tickets, setTickets] = useState([]); // State for storing tickets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); // Getting state from the url

  useEffect(() => {
	const incomingTickets = location.state?.tickets; // Checking if we have any tickets in store
  
  // If there is tickets, show them
	if (incomingTickets && incomingTickets.length > 0) {
	  setTickets(incomingTickets);
	  setLoading(false);
	  return;
	}
  
  // Getting events and tickets-information from API
	fetchEvents()
	  .then(response => {
		const eventWithTickets = response.find(e => e.tickets && e.tickets.length > 0);
		if (eventWithTickets) {
		  setEvent(eventWithTickets);
		  setTickets(eventWithTickets.tickets);
		}
		setLoading(false);
	  })
	  .catch(err => {
		console.error(err);
		setError('Error loading event.');
		setLoading(false);
	  });
  }, [location.state]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Put the tickets in groups based on event-name
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const key = ticket.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push({ ...ticket });
    return acc;
  }, {});

  // Creating tickets with randomized seats and sections
  const ticketsWithSeats = [];
  Object.entries(groupedTickets).forEach(([eventName, group]) => {
    const startSeat = Math.floor(Math.random() * (301 - group.length));
    const section = String.fromCharCode(65 + Math.floor(Math.random() * 3)); // Sections A-C

    // Make sure tickets for same event gets seats next to each other
    group.forEach((ticket, i) => {
      ticketsWithSeats.push({
        ...ticket,
        seatNumber: startSeat + i,
        section
      });
    });
  });

  return (
    <div className="ticket">
      <div className="tickets__list">
        {ticketsWithSeats.length > 0 ? (
          ticketsWithSeats.map((ticket) => {
            const uuid = uuidv4();
            const barcode = generateBarcode(5);
            const eventDate = new Date(ticket.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('en-US', { month: 'short' });

            return (
              <motion.div
                key={uuid}
                className="ticket__card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="ticket__section top">
                  <span className="ticket__label">WHAT</span>
                  <h2 className="ticket__event">{ticket.name}</h2>
                </div>

                <div className="ticket__section location">
                  <span className="ticket__label">WHERE</span>
                  <h3 className="ticket__place">{ticket.location}</h3>
                </div>

                <div className="ticket__section ticket__section-time">
                  <div className="ticket__time-box">
                    <span className="ticket__label">WHEN</span>
                    <p className="ticket__value">{day} {month}</p>
                  </div>
                  <div className="ticket__time-box ticket__time-dash">
                    <span className="ticket__label">FROM</span>
                    <p className="ticket__value">{ticket.from}</p>
                  </div>
                  <div className="ticket__time-box">
                    <span className="ticket__label">TO</span>
                    <p className="ticket__value">{ticket.to}</p>
                  </div>
                </div>

                <div className="ticket__section info">
                  <span className="ticket__label">INFO</span>
                  <p className="ticket__info">
                    Section {ticket.section} – seat {ticket.seatNumber}
                  </p>
                </div>

                <div className="ticket__section barcode">
                  <div className="barcode-container">
                    <span className="barcode">{barcode}</span>
                  </div>
                  <p className="ticket__id">#{uuid.slice(0, 5).toUpperCase()}</p>
                </div>
              </motion.div>
            );
          })
        ) : (
          // If there are no tickets, show messages below
          <div>
            <p style={{ color: 'white', fontFamily: 'SansitaOne', fontSize: '1.5rem',   marginTop: '10rem', padding: '2rem' }}>
              You don't have any tickets yet ☹️
            </p>
            <p style={{ color: 'white', fontFamily: 'SansitaOne', fontSize: '1.5rem', marginTop: '2rem', padding: '2rem' }}>
              Here is some confetti anyway! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ticket;
