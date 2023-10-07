// PokedexRangeFilter.js
import React from 'react';

function PokedexRangeFilter({ range, onRangeChange }) {
  return (
    <div className="pokedex-range-filter">
      <label htmlFor="range-start">Desde: </label>
      <input 
        id="range-start"
        type="number"
        value={range.start}
        onChange={(e) => onRangeChange({ ...range, start: parseInt(e.target.value) })}
      />

      <label htmlFor="range-end">Hasta: </label>
      <input 
        id="range-end"
        type="number"
        value={range.end}
        onChange={(e) => onRangeChange({ ...range, end: parseInt(e.target.value) })}
      />
    </div>
  );
}

export default PokedexRangeFilter;
