import React from 'react';
import './PokemonRegionData.css';

const PokemonRegionData = ({ captureRate, habitat }) => {
    return (
        <div className="pokemon-info">
            <div className="info-item">
                <strong>Tasa de Captura:</strong> {captureRate}
            </div>
            <div className="info-item">
                <strong>Hábitat:</strong> {habitat}
            </div>
        </div>
    );
}

export default PokemonRegionData;
