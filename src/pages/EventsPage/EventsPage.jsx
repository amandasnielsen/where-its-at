import NavButtons from '../../components/NavButtons/NavButtons';
import './eventspage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard';
import { useNavigate } from 'react-router-dom';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // För sökfältet
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://santosnr6.github.io/Data/events.json')
      .then(response => {
        setEvents(response.data.events);
        setFilteredEvents(response.data.events); // Sätt initialt alla event som visbara
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading events');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filtrera event baserat på sökterm
    if (searchTerm) {
      const filtered = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [searchTerm, events]);

  const handleEventClick = (event) => {
    navigate('/tickets', { state: { event, tickets: event.tickets } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="page__events">
      <h1>Events</h1>
      <div className="search__field-wrapper">
        <i className="search__icon fas fa-search"></i>
        <input 
          type="search" 
          placeholder="Search event..." 
          className="search__field"
          value={searchTerm}
          onChange={handleSearchChange} // Hantera ändringar i sökfältet
        />
      </div>
      <div className="event__list-scroll">
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={() => handleEventClick(event)}
            />
          ))
        )}
      </div>
      <NavButtons />
    </section>
  );
}

export default EventsPage;
