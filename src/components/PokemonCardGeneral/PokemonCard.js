// components/PokemonCard.js
import React from 'react';
import './PokemonCard.css';
import { Link } from 'react-router-dom';


// components/PokemonCard.js
function PokemonCard({ pokemon }) {
    return (
        <Link to={`/pokedex/${pokemon.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: 'auto' }}>
            <div className="pokemon-card">
                <img src={pokemon.sprites?.other?.['official-artwork']?.front_default || 'URL_IMAGEN_POR_DEFECTO'} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
                <p>Número Pokedex: {pokemon.id}</p>
                <div className="pokemon-stats">
                    <span>HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</span>
                    <span>W: {pokemon.weight} kg</span>
                    <span>H: {pokemon.height/10} m</span>
                </div>
                <div className="pokemon-types">
                    {pokemon.types.map(type => (
                        <span key={type.type.name}>{type.type.name}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}


export default PokemonCard;
