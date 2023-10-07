// src/components/Pokedex.js
import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import {fetchAllPokemons ,fetchPokemonByName, fetchPokemonsList, fetchPokemonsByType, fetchPokemonsByAbility, fetchPokemonTypes, fetchPokemonAbilities } from '../api/pokeapi';
import './Pokedex.css';
import './searchBar.css'

const Pokedex = () => {
    const [searchName, setSearchName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedAbility, setSelectedAbility] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 15;
    const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
    const [totalPages, setTotalPages] = useState(0);
    const [filtersActive, setFiltersActive] = useState(false);
    const [startRange, setStartRange] = useState(0);
    const [endRange, setEndRange] = useState(0);
    const [rangeMessage, setRangeMessage] = useState('');


    

    useEffect(() => {
        async function fetchData() {
            const [types, abilities] = await Promise.all([fetchPokemonTypes(), fetchPokemonAbilities()]);
            setPokemonTypes(types.results);
            setPokemonAbilities(abilities.results);
        }
        
        fetchData();
        loadPokemonsByPage(1);
    }, []);

    useEffect(() => {
        if (!filtersActive) {
            loadPokemonsByPage(1);
        }
    }, [filtersActive]);
    
    
    
    

    const handleSearch = async () => {
        if (searchName) {
            const result = await fetchPokemonByName(searchName);
            setPokemons([result]);
        }
    };

    const fetchFilteredPokemons = async () => {
        let resultsByType = [];
        let resultsByAbility = [];
        
        // Filtrado por tipo
        if (selectedType) {
            const pokemonsByType = await fetchPokemonsByType(selectedType);
            resultsByType = await Promise.all(pokemonsByType.map(p => fetchPokemonByName(p.pokemon.name)));
        }
        
        // Filtrado por habilidad
        if (selectedAbility) {
            const pokemonsByAbility = await fetchPokemonsByAbility(selectedAbility);
            resultsByAbility = await Promise.all(pokemonsByAbility.map(p => fetchPokemonByName(p.pokemon.name)));
        }
    
        let combinedResults = [];
    
        // Combinación de resultados si ambos, tipo y habilidad, están seleccionados
        if (selectedType && selectedAbility) {
            combinedResults = resultsByType.filter(typePokemon => 
                resultsByAbility.some(abilityPokemon => abilityPokemon.name === typePokemon.name)
            );
        } else if (selectedType) {
            combinedResults = resultsByType;
        } else if (selectedAbility) {
            combinedResults = resultsByAbility;
        } else {
            // Si no hay tipo ni habilidad seleccionados, considera todos los Pokémon
            // Si no hay tipo ni habilidad seleccionados, considera todos los Pokémon
            const allPokemons = await fetchPokemonsList();
            combinedResults = await Promise.all(allPokemons.results.map(pokemon => fetchPokemonByName(pokemon.name)));

        }
    
        // Filtrado por rango (por ID en este caso)
        if (startRange !== 0 || endRange !== 0) {
            combinedResults = combinedResults.filter(pokemon => 
                pokemon.id >= startRange && pokemon.id <= endRange
            );
        }
    
        return combinedResults;
    };
    

    const loadPokemonsByPage = async (page) => {
        try {
            const offset = (page - 1) * ITEMS_PER_PAGE;

            if (filtersActive) {
                const allFilteredPokemons = await fetchFilteredPokemons();
                const paginatedPokemons = allFilteredPokemons.slice(offset, offset + ITEMS_PER_PAGE);
                setPokemons(paginatedPokemons);
                setTotalPages(Math.ceil(allFilteredPokemons.length / ITEMS_PER_PAGE));
            } else {
                const pokemonsList = await fetchPokemonsList(ITEMS_PER_PAGE, offset);
                const detailedPokemons = await Promise.all(pokemonsList.results.map(pokemon => fetchPokemonByName(pokemon.name)));
                setPokemons(detailedPokemons);
                setTotalPages(Math.ceil(pokemonsList.count / ITEMS_PER_PAGE));
            }

            setCurrentPage(page);
        } catch (error) {
            console.error("Error al cargar los Pokémon:", error);
        }
    };

    const handleFilter = async () => {
        // Verifica si no hay ningún filtro seleccionado
        if (!selectedType && !selectedAbility && startRange === 0 && endRange === 0) {
            setErrorMessage('Por favor, selecciona al menos un tipo, habilidad o define un rango antes de aplicar el filtro.');
            return;
        }
        // Si hay valores en el rango, muestra el mensaje del rango
        if (startRange !== 0 || endRange !== 0) {
            setRangeMessage(`Rango seleccionado: ${startRange} - ${endRange}`);
        } else {
            setRangeMessage(''); // Limpia el mensaje del rango si no hay valores
        }
        const filteredResults = await fetchFilteredPokemons();
        setFilteredPokemons(filteredResults);
        setPokemons(filteredResults.slice(0, ITEMS_PER_PAGE));
        setTotalPages(Math.ceil(filteredResults.length / ITEMS_PER_PAGE));
        setCurrentPage(1);
        setFiltersActive(true);
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
                        <option value="">Selecciona un tipo</option>
                        {pokemonTypes.map(type => (
                            <option key={type.name} value={type.name}>{type.name}</option>
                        ))}
                    </select>

                    <select value={selectedAbility} onChange={(e) => setSelectedAbility(e.target.value)}>
                        <option value="">Selecciona una habilidad</option>
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
                    <button onClick={handleFilter}>Aplicar Filtros</button>
                    <button className="clear-filters-btn" onClick={clearFilters}>Limpiar Filtros</button>
                </div>

                {/* Results */}
                <div className="pokemon-list">
                    {pokemons.map(pokemon => (
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
    );
};
export default Pokedex;
