import './eventcard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function EventCard({ event }) {

  const date = new Date(event.when.date);
  const day = date.getDate();
  // Makes sure that the month only uses the three first letters, and make them uppercase
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const formattedDate = `${day} ${month}`;

  return (
    <Link to={`/event/${event.id}`} className="event__card-link">
      <motion.div
        className="event__card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
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
      </motion.div>
    </Link>
  );
}

export default EventCard;