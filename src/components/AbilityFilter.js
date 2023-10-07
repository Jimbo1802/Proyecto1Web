// src/components/AbilityFilter.js

import React from 'react';

function AbilityFilter({ abilities, selectedAbility, onAbilityChange }) {
    return (
        <div className="ability-filter">
            <label>
                Filtrar por habilidad:
                <select value={selectedAbility} onChange={e => onAbilityChange(e.target.value)}>
                    <option value="">Todas</option>
                    {abilities.map(ability => (
                        <option key={ability.name} value={ability.name}>
                            {ability.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default AbilityFilter;
