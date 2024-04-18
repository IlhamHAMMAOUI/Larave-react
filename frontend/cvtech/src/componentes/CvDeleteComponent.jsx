import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/bootstrap-5.1.3-dist/css/bootstrap.min.css';

const CvDeleteComponent = ({ id='8' }) => {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cvtech/${id}`);
        setCvData(response.data.cv);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/cvtech/delete/${id}`);
      console.log('CV deleted successfully:', response.data.message);
      // Mettre à jour l'interface utilisateur après la suppression du CV si nécessaire
    } catch (error) {
      console.error('Error deleting CV:', error);
    }
  };

  return (
    // <div class="modal-dialog modal-dialog-centered">
    //   {cvData && (
    //     <div>
    //       <h2>{cvData.nom} {cvData.prenom}</h2>
    //       <p>Emails : {cvData.emails}</p>
    //       <p>Role : {cvData.role}</p>
    //       {/* <p>Éducation : {cvData.education}</p> */}
    //       <button onClick={handleDelete}>Supprimer</button>
    //     </div>
    //   )}
    // </div>

    <div class="modal-dialog modal-dialog-centered">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Confirmer la suppression</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {cvData && (
        <div>
          <h2>{cvData.nom} {cvData.prenom}</h2>
          <p>Emails : {cvData.emails}</p>
          <p>Role : {cvData.role}</p>
          {/* <p>Éducation : {cvData.education}</p> */}
          <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
        </div>
      )}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
      <button type="button" class="btn btn-danger" onClick={() => handleDelete(cvData.id)}>Supprimer</button>
    </div>
  </div>
</div>

  );
};

export default CvDeleteComponent;
