import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CvUpdateComponent = ({ id='8' }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    emails: '',
    // experiences: '',
    role: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cvtech/${id}`);
        setFormData(response.data.cv);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchData();
  }, [id]);

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
      const response = await axios.put(`http://localhost:8000/api/cvtech/edit/${id}`, formData);
      console.log('CV updated successfully:', response.data.cv);
      // Vous pouvez ajouter ici des logiques pour traiter la réponse ou rediriger l'utilisateur
    } catch (error) {
      console.error('Error updating CV:', error);
    }
  };

  return (
    <div>
      <h2>Modifier le CV</h2>
      <form onSubmit={handleSubmit}>
        {/* Les champs du formulaire avec les valeurs pré-remplies */}
        <div>
          <label htmlFor="nom">Nom:</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
          <label htmlFor="prenom">Prenom:</label>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
          <label htmlFor="emails">emails:</label>
          <input type="text" id="emails" name="emails" value={formData.emails} onChange={handleChange} />
          <label htmlFor="role">Role:</label>
          <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} />
          {/* <label htmlFor="education">Education:</label>
          <input type="text" id="education" name="education" value={formData.education} onChange={handleChange} /> */}
        </div>
        {/* Les autres champs du formulaire */}
        {/* ... */}
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default CvUpdateComponent;
