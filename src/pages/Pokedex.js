import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import {fetchAllPokemons ,fetchPokemonByName, fetchPokemonDetails, fetchPokemonsByType, fetchPokemonsByAbility, fetchPokemonTypes, fetchPokemonAbilities, getAllPokemons , getPokemonFilterData,getTestMessage} from '../api/pokeapi';




import './Pokedex.css';
import './searchBar.css'

const Pokedex2 = () => {

    const [allPokemons, setAllPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [displayPokemon, setDisplayPokemon] = useState([]);
    const [detailPokemonList, setDetailPokemonList] = useState([]);
    

    const [searchName, setSearchName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedAbility, setSelectedAbility] = useState('');
    const [filtersActive, setFiltersActive] = useState(false);
    const [startRange, setStartRange] = useState(0);
    const [endRange, setEndRange] = useState(0);
    const [rangeMessage, setRangeMessage] = useState('');
    const [isSmall, setIsSmall] = useState(false);
    const [isMedium, setIsMedium] = useState(false);
    const [isLarge, setIsLarge] = useState(false);
    const [isLight, setIsLight] = useState(false);
    const [isMiddle, setIsMiddle] = useState(false);
    const [isHeavy, setIsHeavy] = useState(false);

    const [detailsLoaded, setDetailsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    
    useEffect(() => {
        async function fetchData() {
            const [types, abilities, pokemonsFromAPI] = await Promise.all([
                fetchPokemonTypes(), 
                fetchPokemonAbilities(), 
                getAllPokemons(),
            ]);
            setAllPokemons(pokemonsFromAPI);
            setFilteredPokemons(pokemonsFromAPI);
            setPokemonTypes(types.results);
            setPokemonAbilities(abilities.results);
                  
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Este efecto se ejecuta después de que se hayan actualizado todosPokemons y filteredPokemons
        loadPokemonsByPage(1);
    }, [allPokemons, filteredPokemons]);


    const loadPokemonsByPage = async (page) => {
        try {
            const offset = (page - 1) * ITEMS_PER_PAGE;
            console.log("Lista",allPokemons);
            const paginatedPokemons = filteredPokemons.slice(offset, offset + ITEMS_PER_PAGE);
            const detailedPokemons = await Promise.all(paginatedPokemons.map(pokemon => fetchPokemonDetails(pokemon.name)));
            setDisplayPokemon(detailedPokemons);
            setTotalPages(Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE));
            setCurrentPage(page);
        } catch (error) {
            console.error("Error al cargar los Pokémon:", error);
        }
    };

    const handleSearch = async () => {
        console.log("Pokemon a buscar", searchName)
        if (searchName) {
            let globalPokemon = allPokemons;
            const result = globalPokemon.filter(pokemon =>pokemon.name === searchName);
            console.log("Pokemon elegido", result)
            setFilteredPokemons(result);
            loadPokemonsByPage(1);
        }
    };

    const fetchFilteredPokemons = async () => {
        
        let combinedResults = allPokemons
        if (startRange !== 0 || endRange !== 0) {
             // Extraer el ID de cada URL y filtrar por rango
             combinedResults = combinedResults.filter(pokemon => {
                const id = parseInt(pokemon.url.split("/")[pokemon.url.split("/").length - 2]);
                return id >= startRange && id <= endRange;
            });   
        }

        console.log("ListaFiltrada",combinedResults);
        if (selectedType) {
            const pokemonsByType = await fetchPokemonsByType(selectedType);
            // Crear un conjunto de nombres de Pokémon para una búsqueda más rápida
            const pokemonNamesByType = new Set(pokemonsByType.map(p => p.pokemon.name));
            // Filtrar combinedResults2 basándose en los nombres de Pokémon
            combinedResults = combinedResults.filter(pokemon => pokemonNamesByType.has(pokemon.name));
        }
        console.log("ListaFiltrada2",combinedResults);
        // Filtrado por habilidad
        if (selectedAbility) {
            const pokemonsByAbility = await fetchPokemonsByAbility(selectedAbility);
            const pokemonNamesByAbility = new Set(pokemonsByAbility.map(p => p.pokemon.name));
            combinedResults = combinedResults.filter(pokemon => pokemonNamesByAbility.has(pokemon.name));
        }
        if(isSmall || isMedium || isLarge || isLight || isMiddle || isHeavy){
            console.log("ListaFiltrada3",combinedResults);
            // Guarda una copia de la lista original
            const originalCombinedResults = [...combinedResults];
            combinedResults = await getPokemonFilterData();
            console.log("Paso1",combinedResults)
            if (isSmall) {
                combinedResults = combinedResults.filter(pokemon => pokemon.height <= 0.5);
            }
            if (isMedium) {
        
                combinedResults = combinedResults.filter(pokemon => pokemon.height > 0.5 && pokemon.height <= 1.5);
            }
            if (isLarge) {
                combinedResults = combinedResults.filter(pokemon => pokemon.height > 1.5);
            }
            if (isLight) {
                combinedResults = combinedResults.filter(pokemon => pokemon.weight <= 20);
            }
            if (isMiddle) {
                combinedResults = combinedResults.filter(pokemon => pokemon.weight > 20 && pokemon.weight <= 60);
            }
            if (isHeavy) {
                combinedResults = combinedResults.filter(pokemon => pokemon.weight > 60);
            }
            const pokemonNames = combinedResults.map(pokemon => pokemon.name);
            combinedResults = originalCombinedResults.filter(pokemon => pokemonNames.includes(pokemon.name));
        }
       
        return combinedResults
    };

    const handleFilter = async () => {
        const areFiltersInactive = !selectedType && !selectedAbility && (startRange === 0 && endRange === 0) && !isSmall && !isMedium && !isLarge && !isLight && !isMiddle && !isHeavy;
        if(areFiltersInactive){
            setErrorMessage('Por favor, selecciona al menos un tipo, habilidad o define un rango antes de aplicar el filtro.');
            return;
        }else{
            setRangeMessage(''); // Limpia el mensaje del rango si no hay valores
            setRangeMessage(`Rango seleccionado: ${startRange} - ${endRange}`);
            const filteredResults = await fetchFilteredPokemons();
            setFilteredPokemons(filteredResults);
            //setPokemons(filteredResults.slice(0, ITEMS_PER_PAGE));
            //setTotalPages(Math.ceil(filteredResults.length / ITEMS_PER_PAGE));
            //setCurrentPage(1);
            loadPokemonsByPage(1)
        }
    };

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            loadPokemonsByPage(currentPage + 1);
        } else {
            loadPokemonsByPage(currentPage - 1);
        }
    };

    const clearFilters = async () => {
        setSelectedType('');
        setSelectedAbility('');
        setErrorMessage('');
        setSearchName('');
        setStartRange(0);
        setEndRange(0);
        setFiltersActive(false);
        setIsSmall(false);
        setIsMedium(false);
        setIsLarge(false);
        setIsLight(false);
        setIsMiddle(false);
        setIsHeavy(false)
        setFilteredPokemons(allPokemons)
        await loadPokemonsByPage(1);
    };
    
    return (
        <div className="pokedex-container">
            {/* Search Bar */}
            <div className="search-section">
                <input 
                    type="text" 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)} 
                    placeholder="Buscar Pokémon por nombre..."
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>


            {/* Filters and Results */}
            <div className="content-wrapper">
                {/* Filters */}
                <div className="filters-section">
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="">Tipo Pokemon</option>
                        {pokemonTypes.map(type => (
                            <option key={type.name} value={type.name}>{type.name}</option>
                        ))}
                    </select>

                    <select value={selectedAbility} onChange={(e) => setSelectedAbility(e.target.value)}>
                        <option value=""> Habilidad Pokemon</option>
                        {pokemonAbilities.map(ability => (
                            <option key={ability.name} value={ability.name}>{ability.name}</option>
                        ))}
                    </select>
                    <div className="range-container">
                        <label>
                            Desde:
                            <input 
                                type="number" 
                                name="startRange" 
                                placeholder="Inicio" 
                                value={startRange}
                                onChange={(e) => setStartRange(Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Hasta:
                            <input 
                                type="number" 
                                name="endRange" 
                                placeholder="Fin" 
                                value={endRange}
                                onChange={(e) => setEndRange(Number(e.target.value))}
                            />
                        </label>
                    </div>
                    <p>{rangeMessage}</p>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    
                    <div className="height-filters">
                        <span className="filter-title">Filtro de Altura:</span>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={isSmall} 
                                    onChange={() => setIsSmall(!isSmall)} 
                                />
                                Small
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={isMedium} 
                                    onChange={() => setIsMedium(!isMedium)} 
                                />
                                Medium
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={isLarge} 
                                    onChange={() => setIsLarge(!isLarge)} 
                                />
                                Large
                            </label>
                    </div>
                    
                    <div className="weight-filters">
                        <span className="filter-title">Filtro de Peso:</span>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={isLight} 
                                onChange={() => setIsLight(!isLight)} 
                            />
                            Light
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={isMiddle} 
                                onChange={() => setIsMiddle(!isMiddle)} 
                            />
                            Middle
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={isHeavy} 
                                onChange={() => setIsHeavy(!isHeavy)} 
                            />
                            Heavy
                        </label>
                    </div>

                    <button onClick={handleFilter}>Aplicar Filtros</button>
                    <button className="clear-filters-btn" onClick={clearFilters}>Limpiar Filtros</button>
                </div>

                <div className="results-wrapper">
                    
                    {/* Results */}
                    <div className="pokemon-list">
                        {displayPokemon.map(pokemon => (
                            <PokemonCard key={pokemon.name} pokemon={pokemon} />
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Anterior</button>
                        <span>Página {currentPage}</span>
                        <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>Siguiente</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Pokedex2;
