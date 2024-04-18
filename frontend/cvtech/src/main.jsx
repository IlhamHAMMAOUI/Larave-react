//frontend/cvtech/src/main.jsx
import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import LoginForm from './connexion/LoginForm.jsx';
import Navbare from './components/Navbare.jsx';
import Features from './pages/feature/Features.jsx';
import Pricing from './pages/pricing/Pricing.jsx';
import Listes from './pages/list/Listes.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap/dist/css/bootstrap.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import "bootstrap/dist/js/bootstrap.js";
// import "./assets/scss/paper-dashboard.scss";
import './input.css'


const routes = [
  {
    path: '/Login',
    element: <LoginForm />
  },
  {
    path: '/Navbare',
    element: <Navbare />,
    children: [
      {
        path: '/Navbare/Listes', // chemin relatif à /Navbare
        element: <Listes />
      },
      {
        path: '/Navbare/Pricing', // chemin relatif à /Navbare
        element: <Pricing />
      },
      {
        path: '/Navbare/Features', // chemin relatif à /Navbare
        element: <Features />
      }
    ]
  }
];


const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
