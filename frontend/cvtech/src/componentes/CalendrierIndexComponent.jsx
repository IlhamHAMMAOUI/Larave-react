import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CalendrierIndexComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/calendrier');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Liste des événements de calendrier</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Link to={`/calendrier/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendrierIndexComponent;
