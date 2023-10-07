// components/PokemonCard.js
import React from 'react';
import './PokemonCard.css';


// components/PokemonCard.js
function PokemonCard({ pokemon }) {
    return (
        <div className="pokemon-card">
            <img src={pokemon.sprites?.front_default || 'URL_IMAGEN_POR_DEFECTO'} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>Número Pokedex: {pokemon.id}</p>
            <div className="pokemon-stats">
                <span>HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</span>
                <span>W: {pokemon.weight} kg</span>
                <span>H: {pokemon.height} m</span>
            </div>
            <div className="pokemon-types">
                {pokemon.types.map(type => (
                    <span key={type.type.name}>{type.type.name}</span>
                ))}
            </div>
        </div>
    );
}


export default PokemonCard;
