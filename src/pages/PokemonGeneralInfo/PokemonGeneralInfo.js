import React from 'react';
import './PokemonGeneralInfo.css';


const PokemonGeneralInfo = ({ description, evolutionChain }) => {
    return (
        <div className='PokemonGeneralInfo'>
            <strong>Descripción:</strong>
            <p>{description}</p>

            <strong>Evolución:</strong>
            <ul>
                {evolutionChain.map((evolution, index) => (
                    <li key={index}>
                        {evolution.species_name} {evolution.evolves_to.length ? `→ ${evolution.evolves_to.join(', ')}` : ''}
                        {evolution.evolution_details.map((detail, detailIndex) => (
                            <div key={detailIndex}>
                                {detail.trigger.name === "level-up" && `Al nivel ${detail.min_level}`}
                                {detail.item && `Usando ${detail.item.name}`}
                                {/* Puedes agregar más condiciones aquí según las necesidades */}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonGeneralInfo;
