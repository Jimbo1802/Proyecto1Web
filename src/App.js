import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pokedex from './pages/Pokedex';
import Regions from './pages/Regions';
import Moves from './pages/Moves';
import LearnMore from './pages/LearnMore';
import ContactUs from './pages/ContactUs';


function App() {
  return (
      <Router>
          <div className='container'>
          <Navbar />
          <Routes>
              <Route path="/pokedex" element={<Pokedex />} />
              <Route path="/regions" element={<Regions />} />
              <Route path="/moves" element={<Moves />} />
              <Route path="/learnmore" element={<LearnMore />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/" element={<Pokedex />} /> {/* Página principal */}
          </Routes>
          </div>
      </Router>
  );
}

export default App;

