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






