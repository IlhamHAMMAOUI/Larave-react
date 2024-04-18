// Dans Listes.jsx
import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
import {
 Table,
} from "reactstrap";
// import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CvUpdateComponent from "../../componentes/CvUpdateComponent";
import CvCreateComponent from '../../componentes/CvCreateComponent';
import axios from 'axios';
// import 'assets/bootstrap-5.1.3-dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function Listes() {
const [cvDataList, setCvDataList] = useState([]);
  const [selectedCvId, setSelectedCvId] = useState(null); // État pour stocker l'ID du CV sélectionné pour la mise à jour
  const [showCreateForm, setShowCreateForm] = useState(false); // État pour afficher ou masquer le formulaire de création de CV
  // const { data, isLoading, isError } = useQuery('cvList', fetchCvDataList);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching data</div>;

  useEffect(() => {
    const fetchDataForAllIds = async () => {
      try {
        const idListResponse = await axios.get('http://localhost:8000/api/cvtech/ids');
        const idList = idListResponse.data;

        const cvDataPromises = idList.map(async (id) => {
          try {
            const cvResponse = await axios.get(`http://localhost:8000/api/cvtech/${id}`);
            return { id, ...cvResponse.data.cv };
          } catch (error) {
            console.error(`Error fetching CV data for ID ${id}:`, error);
            return null;
          }
        });

        const cvDataList = await Promise.all(cvDataPromises);

        setCvDataList(cvDataList.filter(cvData => cvData !== null));
      } catch (error) {
        console.error('Error fetching CV IDs:', error);
      }
    };

    fetchDataForAllIds();
  }, []);
   //suppression
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce CV ?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/cvtech/delete/${id}`);
        console.log('CV deleted successfully:', response.data.message);
        setCvDataList(cvDataList.filter(cv => cv.id !== id));
      } catch (error) {
        console.error('Error deleting CV:', error);
      }
    }
  };

  const handleUpdateClick = (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce CV ?');
    setSelectedCvId(id);
  };

  const handleCreateButtonClick = () => {
    setShowCreateForm(!showCreateForm); // Afficher ou masquer le formulaire de création de CV
  };
//   return (
//     <h1>hello Listes</h1>
//   );
// }
  return (
    <div>
<h1>Liste des CV</h1>
<div className="d-flex justify-content-start mb-4">
<div className="input-group">
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
            <button type="submit">New</button>
          </form>
        </div>
      
        </div>
        <div className="d-flex justify-content-end mb-4">
      <button onClick={handleCreateButtonClick}>Créer</button>
      
      </div>
      {showCreateForm && <CvCreateComponent />}
      
        <Table striped bordered hover size="sm">
        
      <thead>
        <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>emails</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
      </thead>
      <tbody>
        {cvDataList.map((cvData, index) => (
            <tr key={index} className={index % 2 === 0 ? "odd:bg-white even:bg-slate-50" : "even:bg-white odd:bg-slate-50"}>
              <td>{cvData.id}</td>
              <td>{cvData.nom}</td>
              <td>{cvData.prenom}</td>
              <td>{cvData.emails}</td>
              <td>{cvData.role}</td>
              <td>
                <button onClick={() => handleDelete(cvData.id)}>Delete</button>
                <button onClick={() => handleUpdateClick(cvData.id)}>Update</button>
              </td>
            </tr>
            ))}
      </tbody>
    </Table>
    {selectedCvId && <CvUpdateComponent id={selectedCvId} />}

    {/* Noueaux: */}
    <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    {/* Noiveaux: */}
    </div>

  );
}

export default Listes;