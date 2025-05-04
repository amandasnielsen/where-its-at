import { useEffect, useState } from 'react';
import axios from 'axios'; // Importera axios för att göra HTTP-förfrågningar
import { v4 as uuidv4 } from 'uuid';
import './ticket.css';

function generateBarcode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function Ticket() {
  const [event, setEvent] = useState(null); // State för att lagra eventet
  const [tickets, setTickets] = useState([]); // State för att lagra biljetter
  const [loading, setLoading] = useState(true); // State för att hålla reda på om vi är under laddning
  const [error, setError] = useState(null); // State för att hålla reda på eventuella fel

  useEffect(() => {
    // Hämta JSON-filen när komponenten laddas
    axios.get('https://santosnr6.github.io/Data/events.json')
      .then(response => {
        // Här kan vi välja att filtrera ett specifikt event om vi har en ID för det
        // Exempelvis om vi har ett eventID i URL eller via 'location.state'
        const event = response.data.events.find(e => e.id === 'specific-event-id'); // Byt ut mot rätt ID
        if (event) {
          setEvent(event);
          setTickets(event.tickets || []); // Se till att biljetterna finns, annars sätt till tom array
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading event');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Kontrollera om vi har biljetter, om inte visa meddelande
  if (!tickets || tickets.length === 0) {
	return (
	  <div>
		<p style={{ color: 'white', fontFamily: 'SansitaOne', fontSize: '2rem', marginTop: '10rem', padding: '2rem' }}>
		  You don't have any tickets yet ☹️
		</p>
		<p style={{ color: 'white', fontFamily: 'SansitaOne', fontSize: '1.5rem', marginTop: '2rem', padding: '2rem' }}>
		  Here is some confetti anyway! 🎉
		</p>
	  </div>
	);
  }

  // Gruppindela biljetter per event
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const key = ticket.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push({ ...ticket });
    return acc;
  }, {});

  const ticketsWithSeats = [];
  Object.entries(groupedTickets).forEach(([eventName, group]) => {
    const startSeat = Math.floor(Math.random() * (301 - group.length));
    const section = String.fromCharCode(65 + Math.floor(Math.random() * 3)); // 'A' – 'C'

    group.forEach((ticket, i) => {
      ticketsWithSeats.push({
        ...ticket,
        seatNumber: startSeat + i,
        section
      });
    });
  });

  // Kontrollera om eventet och event.where finns
  const eventLocation = event && event.where ? event.where : 'Location not available';

  return (
    <div className="tickets__page">
      <h1>Your Tickets</h1>
      <div className="tickets__list">
        {ticketsWithSeats.length > 0 ? (
          ticketsWithSeats.map((ticket) => {
            const uuid = uuidv4();
            const barcode = generateBarcode(10);
            const eventDate = new Date(ticket.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('en-US', { month: 'short' });

            return (
              <div key={uuid} className="ticket__card">
                <div className="ticket__section top">
                  <span className="ticket__label">WHAT</span>
                  <h2 className="ticket__event">{ticket.name}</h2>
                </div>

                <div className="ticket__section location">
                  <span className="ticket__label">WHERE</span>
                  <h3 className="ticket__place">{eventLocation}</h3>
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
              </div>
            );
          })
        ) : (
          <div>No tickets available</div>
        )}
      </div>
    </div>
  );
}

export default Ticket;
