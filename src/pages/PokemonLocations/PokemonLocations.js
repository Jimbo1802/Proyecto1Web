// PokemonLocations.js
import React from 'react';
import './PokemonLocations.css';

const PokemonLocations = ({ locations }) => {
    // Si "locations" está vacío o no está definido, no renderizar nada
    if (!locations || locations.length === 0) {
        return null;
    }

    return (
        <div className="locations-container">
            <h2>Ubicaciones de Encuentro</h2>
            <ul>
                {locations.map((loc, index) => (
                    <li key={index}>
                        <strong>{loc.location}</strong>: {loc.methods.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonLocations;
