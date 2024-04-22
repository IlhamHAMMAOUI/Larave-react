import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CalendrierShowComponent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calendrier/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div>
      <h2>Détails de l'événement</h2>
      {event && (
        <div>
          <p>Titre: {event.title}</p>
          <p>Date de début: {event.start_date}</p>
          <p>Date de fin: {event.end_date}</p>
          <p>Description: {event.description}</p>
          {/* Ajoutez ici d'autres détails de l'événement si nécessaire */}
        </div>
      )}
    </div>
  );
};

export default CalendrierShowComponent;
