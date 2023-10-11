import React from 'react';
import './PokemonType.css';  // Importa el archivo CSS

function PokemonType({ typeName }) {
  return (
    <span className={`type ${typeName}`}>
      {typeName}
    </span>
  );
}

export default PokemonType;
