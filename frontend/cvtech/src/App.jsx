//frontend/cvtech/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './connexion/LoginForm';
import Navbare from './components/Navbare';
import Features from './pages/feature/Features';
import Pricing from './pages/pricing/Pricing';
import Listes from './pages/list/Listes';
import DemoApp from './calendrier/DemoApp';
import { INITIAL_EVENTS, createEventId } from './event-utils'

function App() {
  return (
    <Router>
      <div className='center'>
        <Routes>
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Navbare" element={<Navbare />} />
          <Route path="/Navbare/Listes" element={<Listes />} />
          <Route path="/Navbare/Pricing" element={<Pricing />} />
          <Route path="/Navbare/Features" element={<Features />} />
          <Route path="/Navbare/DemoApp" element={<DemoApp />} />
          <Route path="/INITIAL_EVENTS" element={<INITIAL_EVENTS />} />
          <Route path="/createEventId" element={<createEventId />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
