// PokemonSprites.js
import React from 'react';
import './PokemonSprites.css';

const PokemonSprites = ({ sprites }) => {
    return (
        <div className="sprites-container">
            
            <div className="sprite">
                <img src={sprites.front} alt="Frontal" />
                <p>Frontal</p>
            </div>
            <div className="sprite">
                <img src={sprites.back} alt="Trasera" />
                <p>Trasera</p>
            </div>
            <div className="sprite">
                <img src={sprites.front_shiny} alt="Frontal Shiny" />
                <p>Frontal Shiny</p>
            </div>
            <div className="sprite">
                <img src={sprites.back_shiny} alt="Trasera Shiny" />
                <p>Trasera Shiny</p>
            </div>
        </div>
    );
}

export default PokemonSprites;
