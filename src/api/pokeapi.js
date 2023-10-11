// src/api/pokeapi.js

const BASE_URL = 'https://pokeapi.co/api/v2';

const BASE_URL2 = 'http://127.0.0.1:5000';


export const getAllPokemons = () => {
    return fetch(`${BASE_URL2}/pokemons`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json().then(data => {
                return data; // Luego, devuelves los datos
            });
        });
};

export const getPokemonFilterData = () => {
    return fetch(`${BASE_URL2}/pokemons_filtered`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json().then(data => {
                return data; // Luego, devuelves los datos
            });
        });
};

export const getTestMessage = () => {
    return fetch(`${BASE_URL2}/test`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};


function romanToDecimal(roman) {
    const romanNumeralMap = {
      'i': 1,
      'ii': 2,
      'iii': 3,
      'iv': 4,
      'v': 5,
      'vi': 6,
      'vii': 7,
      'viii': 8,
      'ix': 9,
      'x': 10
    };
    return romanNumeralMap[roman]
  }
  




export const getPokemonDetails = async (name) => {
    try {
        // Obtener detalles básicos del Pokémon
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('No se encontró el Pokémon');
        }
        const pokemonData = await response.json();

        // Almacenar debilidades
        let weaknesses = [];

        // Para cada tipo del Pokémon, obten las relaciones de eficacia
        for (const typeInfo of pokemonData.types) {
            const typeResponse = await fetch(`${BASE_URL}/type/${typeInfo.type.name}`);
            const typeData = await typeResponse.json();

            // Buscar los tipos que son super efectivos contra este tipo de Pokémon
            for (const damageRelation of typeData.damage_relations.double_damage_from) {
                if (!weaknesses.includes(damageRelation.name)) {
                    weaknesses.push(damageRelation.name);
                }
            }
        }

        // Agregar debilidades al objeto de datos
        pokemonData.weaknesses = weaknesses;

        // Obtener detalles de la especie del Pokémon para género y generación
        const speciesResponse = await fetch(`${BASE_URL}/pokemon-species/${name}`);
        if (!speciesResponse.ok) {
            throw new Error('No se encontró información de especie del Pokémon');
        }
        const speciesData = await speciesResponse.json();

        // Generación
        const generationNumber = romanToDecimal(speciesData.generation.name.split('-')[1]); 
        pokemonData.generation =generationNumber;

        // Proporción de género
        const malePercentage = speciesData.gender_rate * 12.5; // gender_rate es el ratio de género masculino. Se multiplica por 12.5 para obtener el porcentaje.
        const femalePercentage = 100 - malePercentage;
        pokemonData.gender = {
            male: malePercentage,
            female: femalePercentage
        };

        return pokemonData;
    } catch (error) {
        throw error;
    }
};







export const fetchAllPokemons = async (url = 'https://pokeapi.co/api/v2/pokemon?limit=100') => {
    const response = await fetch(url);
    const data = await response.json();
    const pokemons = data.results;
    if (data.next) {
        const nextPokemons = await fetchAllPokemons(data.next);
        return pokemons.concat(nextPokemons);
    } else {
        return pokemons;
    }
};

export const fetchPokemonDetails = async (name) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('No se encontró el Pokémon');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const fetchPokemonByName = async (name) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('No se encontró el Pokémon');
        }
        const data = await response.json();
        // Extraer sólo el nombre y peso del Pokémon
        const result = {
            name: data.name,
            height: data.height/10,
            weight: data.weight/10
        };

        return result;

    } catch (error) {
        throw error;
    }
};


export const fetchPokemonsList = async (limit = 9, offset = 0) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de Pokémon');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchPokemonsByType = async (type) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) {
        throw new Error('Error al obtener la lista de Pokémon por tipo');
      }
      const data = await response.json();
      return data.pokemon; // Devolvemos la lista de Pokémon de ese tipo
    } catch (error) {
      throw error;
    }
  };
  

export const fetchPokemonTypes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/type`);
        if (!response.ok) {
            throw new Error('Error al obtener los tipos de Pokémon');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchPokemonAbilities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/ability`);
        if (!response.ok) {
            throw new Error('Error al obtener las habilidades de Pokémon');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchRegions = async () => {
    try {
        const response = await fetch(`${BASE_URL}/region`);
        if (!response.ok) {
            throw new Error('Error al obtener las regiones');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchLocationsByRegion = async (regionName) => {
    try {
        const response = await fetch(`${BASE_URL}/region/${regionName}`);
        if (!response.ok) {
            throw new Error('Error al obtener las localidades de la región');
        }
        const data = await response.json();
        return data.locations;
    } catch (error) {
        throw error;
    }
};




export const fetchPokemonsByAbility = async (ability) => {
    console.log("asdaqsd")
    try {
        const response = await fetch(`${BASE_URL}/ability/${ability}`);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de Pokémon por habilidad');
        }
        const data = await response.json();
        return data.pokemon; // Devolvemos la lista de Pokémon con esa habilidad
    } catch (error) {
        throw error;
    }
};






