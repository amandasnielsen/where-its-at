import NavButtons from '../../components/NavButtons/NavButtons';
import './eventspage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard';

function EventsPage() {

	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  
	useEffect(() => {
	  axios
		.get('https://santosnr6.github.io/Data/events.json')
		.then(response => {
		  setEvents(response.data.events);
		  setLoading(false);
		})
		.catch(err => {
		  setError('Error loading events');
		  setLoading(false);
		});
	}, []);
  
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
			className='search__field'
		  />
		</div>
		<div className="event__list-scroll">
			{events.map(event => (
			<EventCard key={event.id} event={event} />
			))}
      	</div>
		<NavButtons />
	  </section>
	);
  }
  

export default EventsPage;