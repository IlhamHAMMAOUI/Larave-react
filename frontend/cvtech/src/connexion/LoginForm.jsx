//frontend/cvtech/src/connexion/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import '../input.css';
import '../output.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    //Nouveaux:
    const navigate = useNavigate();
    //Nouveaux:

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/cvtech/login', credentials);
            // Vérifier si la réponse contient des données utilisateur
            if (response.data.token) {
                console.log('User logged in successfully');
                // Enregistrer le token JWT dans le localStorage
                localStorage.setItem('token', response.data.token);

                //Nouveaux:
                // Rediriger l'utilisateur vers la page Navbare après la connexion réussie
                // navigate.push('/Navbare');
                navigate('/Navbare');
                //Nouveaux:
                // Mettre à jour l'interface utilisateur après la connexion si nécessaire
            } else {
                console.error('Error logging in: User not found');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    return (
        
<div className="login">

        <h4>Login</h4>
        <form onSubmit={handleLogin}>
          <div className="text_area">
            <input
              type="email"
              placeholder="Please input your email"
              name="email"
              value={credentials.email}
               onChange={handleChange}

            />
          </div>
          <div className="text_area">
            <input
              type="password"
              placeholder="Please input your password"
              name="password"
              value={credentials.password}
              onChange={handleChange}

            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn"

          />
        </form>
        {/* <a className="link" href="/signup">Sign Up</a> */}
        
        
      </div>


    );
}

export default LoginForm;