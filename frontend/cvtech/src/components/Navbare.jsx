//frontend/cvtech/src/components/Navbare.jsx
import React from 'react';
import {Button} from 'react-bootstrap';
import '../input.css';
import '../output.css';
import { Outlet, useNavigate, Link } from "react-router-dom";
import axios from 'axios';


export default function Navbare() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      console.log('Token:', token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post('http://localhost:8000/api/cvtech/logout', null, config);
      console.log('User logged out successfully');
      // Après la déconnexion, rediriger l'utilisateur vers la page de connexion
          navigate('/Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <>
      <div id="sidebar">

        <h1>
          <Button onClick={handleLogout}>Déconnexion</Button>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/Navbare/Listes">Listes</Link>
            </li>
            <li>
              <Link to="/Navbare/Pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/Navbare/Features">Features</Link>
            </li>
          </ul>
        </nav>

      </div>
      <div id="detail">
        <Outlet />
      </div>
      
    </>
  );
}

