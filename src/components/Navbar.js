import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/pokedex">Pokedex</Link></li>
                <li><Link to="/regiones">Regiones</Link></li>
                <li><Link to="/movimientos">Movimientos</Link></li>
                <li><Link to="/aprende">Aprende sobre Pokémon</Link></li>
                <li><Link to="/contactanos">Contáctanos</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
