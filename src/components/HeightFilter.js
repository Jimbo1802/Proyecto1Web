// HeightFilter.js
import React from 'react';

function HeightFilter({ selectedHeight, onHeightChange }) {
  return (
    <div className="height-filter">
      <label htmlFor="height-select">Filtrar por estatura: </label>
      <select 
        id="height-select"
        value={selectedHeight || ''}
        onChange={(e) => onHeightChange(e.target.value)}
      >
        <option value="">Todas las estaturas</option>
        <option value="small">Pequeño</option>
        <option value="medium">Mediano</option>
        <option value="large">Grande</option>
      </select>
    </div>
  );
}

export default HeightFilter;
