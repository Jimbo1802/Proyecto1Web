import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pokedex from './pages/Pokedex/Pokedex';
import PokemonDetail from './pages/PokeDetail/PokemonDetail';
import PokemonDetailRegion from './pages/PokeDetailRegions/PokemonDetailRegion';
import PokeDetailMoves from './pages/PokeDetailMoves/PokeDetailMoves';
import Regions from './pages/Regions/Regions';
import Moves from './pages/Moves/Moves';
import LearnMore from './pages/LearnMore/LearnMore';
import ContactUs from './pages/ContactUs/ContactUs';


function App() {
    return (
        <Router>
            <div className='container'>
            <Navbar />
            <Routes>
                <Route path="/pokedex" element={<Pokedex />} />
                <Route path="/pokedex/:name" element={<PokemonDetail />} /> {/* Ruta de detalles del Pokémon */}
                <Route path="/regions" element={<Regions />} />
                <Route path="/regions/:name" element={<PokemonDetailRegion />} />
                <Route path="/moves" element={<Moves />} />
                <Route path="/moves/:name" element={<PokeDetailMoves />} />
                <Route path="/learnmore" element={<LearnMore />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/" element={<Pokedex />} /> {/* Página principal */}
            </Routes>
            </div>
        </Router>
    );
  }

export default App;

