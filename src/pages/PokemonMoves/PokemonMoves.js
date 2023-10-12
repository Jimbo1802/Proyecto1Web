// PokemonMoves.js
import React from 'react';
import './PokemonMoves.css';

const PokemonMoves = ({ movesDetailed }) => {
    return (
        <div className="moves-container">
            <h2>Movimientos</h2>
            <ul>
                {movesDetailed.map((moveDetail, index) => (
                    <li key={index} className="move-detail">
                        <strong>{moveDetail.name}</strong>
                        <p>Método: {moveDetail.learnMethod}</p>
                        <p>Nivel: {moveDetail.levelLearnedAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonMoves;
