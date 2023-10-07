// components/TypeFilter.js
import React from 'react';

function TypeFilter({ types, selectedType, onTypeChange }) {
    return (
        <div className="type-filter">
            <label>
                Filtrar por tipo:
                <select value={selectedType} onChange={e => onTypeChange(e.target.value)}>
                <option key="Todos" value="Todos">
                            Todos
                        </option>
                    {types.map(type => (
                        <option key={type.name} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default TypeFilter;
