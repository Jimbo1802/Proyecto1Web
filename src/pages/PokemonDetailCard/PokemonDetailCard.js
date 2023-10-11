import React from 'react';
import './PokemonDetailCard.css';

const PokemonDetailCard = ({ pokemonDetails }) => {
  return (
    <div className="pokemon-details-container">
      <img
        src={pokemonDetails?.sprites?.other?.['official-artwork']?.front_default}
        alt={pokemonDetails.name}
        className="pokemonImage"
      />

      <div className="pokemonDetails">
        <p>
          <strong>Name:</strong> {pokemonDetails.name}
        </p>
        <p>
          <strong>Generation:</strong> {pokemonDetails.generation}
        </p>

        <div className="dimensions">
          <p>
            <strong>Weight:</strong> {pokemonDetails.weight / 10} Kg
          </p>
          <p>
            <strong>Height:</strong> {pokemonDetails.height / 10} M
          </p>
        </div>

        <div className="genderInfo">
          <p>
            <strong>Gender:</strong> {pokemonDetails.gender.male}% Male,{' '}
            {pokemonDetails.gender.female}% Female
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailCard;
