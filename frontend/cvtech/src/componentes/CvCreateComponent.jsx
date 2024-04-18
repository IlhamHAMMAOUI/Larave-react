import React, { useState } from 'react';
import axios from 'axios';

const CvCreateComponent = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    emails: '',
    role: ''
    // experiences: '',
    // education: ''
  });

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
      const response = await axios.post('http://localhost:8000/api/cvtech/create', formData);
      console.log('CV created successfully:', response.data.cv);
      // Vous pouvez ajouter ici des logiques pour traiter la réponse ou rediriger l'utilisateur
    } catch (error) {
      console.error('Error creating CV:', error);
    }
  };

  return (
    <div>
      <h2>Créer un nouveau CV</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom:</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="prenom">Prénom:</label>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="emails">Emails:</label>
          <input type="text" id="emails" name="emails" value={formData.emails} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} />
        </div>
        {/* <div>
          <label htmlFor="education">Éducation:</label>
          <input type="text" id="education" name="education" value={formData.education} onChange={handleChange} />
        </div> */}
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CvCreateComponent;
