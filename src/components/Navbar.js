import React from 'react';
import './Navbar.css';
import { NavLink  } from 'react-router-dom';

const navLinks = [
    { path: "/pokedex", label: "Pokedex" },
    { path: "/regions", label: "Regiones" },
    { path: "/moves", label: "Movimientos" },
    { path: "/learnmore", label: "Aprende más" },
    { path: "/contactus", label: "Contacto" }
  ];
  

  function Navbar() {
    return (
        <nav>
            <div className="brand">
                <span>PokeFinder</span>
            </div>
            <ul className="nav-links">
                {navLinks.map(link => (
                    <li key={link.path}>
                        <NavLink to={link.path} activeClassName="active">
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
