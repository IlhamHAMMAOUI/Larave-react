import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const CalendrierDestroyComponent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/calendrier/${id}`);
        setEventData(response.data.evenement);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/calendrier/delete/${id}`);
      console.log('Event deleted successfully');
      // Rediriger l'utilisateur vers une autre page après la suppression de l'événement
      history.push('/calendrier');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h2>Confirmer la suppression de l'événement</h2>
      {eventData && (
        <div>
          <p>Titre: {eventData.title}</p>
          <p>Date de début: {eventData.start_date}</p>
          <p>Date de fin: {eventData.end_date}</p>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

export default CalendrierDestroyComponent;
