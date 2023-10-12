import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetailsRegions } from '../../api/pokeapi';
import PokemonType from '..//PokemonType/PokemonType';
import PokemonDetailCard from '../PokemonDetailCard/PokemonDetailCard';
import PokemonGeneralInfo from '../PokemonGeneralInfo/PokemonGeneralInfo';  // Ajusta la ruta según donde hayas guardado el archivo
import PokemonSprites from '../PokemonSprites/PokemonSprites';
import PokemonInfo from '../PokemonRegionData/PokemonRegionData';  // Ajusta la ruta según donde hayas guardado el archivo
import PokemonLocation from '../PokemonLocations/PokemonLocations';
import './PokemonDetailRegion.css';






const PokemonDetail = () => {
    const { name } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    

    useEffect(() => {
        async function fetchDetails() {
            const details = await getPokemonDetailsRegions(name);
            console.log(details)
            setPokemonDetails(details);
        }

        fetchDetails();
    }, [name]);

    if (!pokemonDetails) return <div>Cargando...</div>;

    return (
      <div className="pokemonContainer">
        <div className="section1">
            <PokemonDetailCard pokemonDetails={pokemonDetails} />
          <div className="pokemonType">
            <strong>Type:</strong><br/><br/>
            {pokemonDetails.types.map(typeInfo => (
              <PokemonType key={typeInfo.type.name} typeName={typeInfo.type.name} />
            ))}
          </div>
          <div className="pokemonWeaknesses">
            <strong>Weaknesses:</strong>
            <br/>
            <br/>
            {pokemonDetails.weaknesses.map(weakness => (
              <PokemonType key={weakness} typeName={weakness} />
            ))}
          </div>
      
          <div className="pokemonStats">
            <strong>Stats:</strong><br/>
            {pokemonDetails.stats.map(stat => (
              <div key={stat.stat.name} className="stat-container">
                <span className="stat-label">
                  {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:
                </span>
                <span className="stat-value">
                  {stat.base_stat}
                </span>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{ width: `${stat.base_stat}%` }} 
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section2">
          
          <PokemonGeneralInfo
              description={pokemonDetails.description}
              evolutionChain={pokemonDetails.evolutionChain}
          />
          <PokemonInfo captureRate={pokemonDetails.captureRate} habitat={pokemonDetails.habitat} />
          <PokemonLocation locations={pokemonDetails.locations} />


        </div>
      </div>    
      );
}

export default PokemonDetail;
