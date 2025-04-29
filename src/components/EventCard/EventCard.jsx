import './eventcard.css';
import { Link } from 'react-router-dom';

function EventCard({ event }) {

  const date = new Date(event.when.date);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const formattedDate = `${day} ${month}`;

  return (
    <Link to={`/event/${event.id}`} className="event__card-link">
      <div className="event__card">
        <div className="event__card-left">
          <p className="event__card-date">{formattedDate}</p>
        </div>
        <div className="event__card-right">
          <h2 className="event__card-name">{event.name}</h2>
          <p className="event__card-where">{event.where}</p>
          <span>
            <p className="event__card-time">{event.when.from}-{event.when.to}</p>
            <p className="event__card-price">{event.price} sek</p>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;