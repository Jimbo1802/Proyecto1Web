// WeightFilter.js
import React from 'react';

function WeightFilter({ selectedWeight, onWeightChange }) {
  return (
    <div className="weight-filter">
      <label htmlFor="weight-select">Filtrar por peso: </label>
      <select 
        id="weight-select"
        value={selectedWeight || ''}
        onChange={(e) => onWeightChange(e.target.value)}
      >
        <option value="">Todos los pesos</option>
        <option value="light">Ligero</option>
        <option value="middle">Medio</option>
        <option value="heavy">Pesado</option>
      </select>
    </div>
  );
}

export default WeightFilter;
