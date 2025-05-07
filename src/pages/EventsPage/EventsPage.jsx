import NavButtons from '../../components/NavButtons/NavButtons';
import './eventspage.css';
import React, { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../api';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Getting events-information from API
  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error loading events');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter events based on search-term
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
      <label htmlFor="event-search" className="visually-hidden">Search for event</label>
        <i className="search__icon fas fa-search"></i>
        <input 
          id="event-search"
          type="search" 
          placeholder="Search event..." 
          className="search__field"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="event__list-scroll">
        {filteredEvents.length === 0 ? (
          <p style={{ color: 'white', fontFamily: 'FiraSans', fontSize: '1rem', marginTop: '2rem', padding: '2rem' }}>
          No events found
          </p>
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
