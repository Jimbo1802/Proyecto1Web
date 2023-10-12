import React from 'react';
import './PokemonDetailCard.css';

const PokemonDetailCard = ({ pokemonDetails }) => {
  return (
    <div className="pokemon-details-container">
      <img
        src={pokemonDetails.sprites.profile}
        alt={pokemonDetails.name}
        className="pokemonImage"
      />

      <div className="pokemonDetails">
        <p>
            Name: <strong>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1).toLowerCase()}</strong>
        </p>
        <p>
          Generation: <strong>{pokemonDetails.generation}</strong>
        </p>
        <div className="dimensions">
          <p>
            Weight:<strong>{pokemonDetails.weight / 10} Kg </strong>
          </p>
          <p>
            Height:<strong>{pokemonDetails.height / 10} M </strong>
          </p>
        </div>

        <div className="genderInfo">
          <p>
            Gender:<strong>{pokemonDetails.gender.male}% Male,{' '}
            {pokemonDetails.gender.female}% Female</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailCard;
