import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CalendrierStoreComponent = () => {
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    description: '',
    location: '',
    participants: ''
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/calendrier/create', formData);
      console.log('Event created successfully:', response.data);
      // Rediriger l'utilisateur vers une autre page après la création de l'événement
      history.push('/calendrier');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <h2>Créer un nouvel événement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="start_date">Date de début:</label>
          <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="end_date">Date de fin:</label>
          <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="location">Lieu:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="participants">Participants:</label>
          <input type="text" id="participants" name="participants" value={formData.participants} onChange={handleChange} />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CalendrierStoreComponent;
