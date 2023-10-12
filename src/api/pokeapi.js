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
        for (const typeInfo of pokemonData.types) {
            const typeResponse = await fetch(`${BASE_URL}/type/${typeInfo.type.name}`);
            const typeData = await typeResponse.json();
            for (const damageRelation of typeData.damage_relations.double_damage_from) {
                if (!weaknesses.includes(damageRelation.name)) {
                    weaknesses.push(damageRelation.name);
                }
            }
        }
        pokemonData.weaknesses = weaknesses;

        
        // Sprites
        pokemonData.sprites = {
            profile: pokemonData.sprites?.other?.['official-artwork'].front_default,
            front: pokemonData.sprites.front_default,
            back: pokemonData.sprites.back_default,
            front_shiny: pokemonData.sprites.front_shiny,
            back_shiny: pokemonData.sprites.back_shiny
        }

        console.log("Imagenes", pokemonData.sprites)

        // Obtener detalles de la especie del Pokémon para género, generación y descripción
        const speciesResponse = await fetch(`${BASE_URL}/pokemon-species/${name}`);
        if (!speciesResponse.ok) {
            throw new Error('No se encontró información de especie del Pokémon');
        }
        const speciesData = await speciesResponse.json();

        // Generación y Ratio de Género
        const generationNumber = romanToDecimal(speciesData.generation.name.split('-')[1]); 
        pokemonData.generation = generationNumber;
        const malePercentage = speciesData.gender_rate * 12.5;
        const femalePercentage = 100 - malePercentage;
        pokemonData.gender = {
            male: malePercentage,
            female: femalePercentage
        };

        // Descripción del Pokémon
        const pokedexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
        if (pokedexEntry) {
            pokemonData.description = pokedexEntry.flavor_text;
        } else {
            pokemonData.description = "Descripción no disponible";
        }

        // Cadena de Evolución
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        pokemonData.evolutionChain = [];
        let currentEvolution = evolutionData.chain;
        while (currentEvolution) {
            pokemonData.evolutionChain.push({
                species_name: currentEvolution.species.name,
                evolves_to: currentEvolution.evolves_to.map(evo => evo.species.name),
                evolution_details: currentEvolution.evolves_to.map(evo => evo.evolution_details[0])
            });
            currentEvolution = currentEvolution.evolves_to[0];
        }

        return pokemonData;
    } catch (error) {
        throw error;
    }
};



export const getPokemonDetailsRegions = async (name) => {
    try {
        // Obtener detalles básicos del Pokémon
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('No se encontró el Pokémon');
        }
        const pokemonData = await response.json();

        // Almacenar debilidades
        let weaknesses = [];
        for (const typeInfo of pokemonData.types) {
            const typeResponse = await fetch(`${BASE_URL}/type/${typeInfo.type.name}`);
            const typeData = await typeResponse.json();
            for (const damageRelation of typeData.damage_relations.double_damage_from) {
                if (!weaknesses.includes(damageRelation.name)) {
                    weaknesses.push(damageRelation.name);
                }
            }
        }
        pokemonData.weaknesses = weaknesses;

        // Sprites
        pokemonData.sprites = {
            profile: pokemonData.sprites?.other?.['official-artwork'].front_default,
        }

        // Después de obtener los detalles básicos del Pokémon...
        console.log("Lugares", pokemonData.location_area_encounters)
        const locationResponse = await fetch(pokemonData.location_area_encounters);
        if (!locationResponse.ok) {
            throw new Error('No se encontraron áreas de encuentro para el Pokémon');
        }
        const locationData = await locationResponse.json();
        
        pokemonData.locations = locationData.map(location => ({
            location: location.location_area.name.split('-').join(' '), // Convertir nombres como "pallet-town" a "pallet town"
            methods: location.version_details[0].encounter_details.map(detail => detail.method.name) // Esto asume que sólo estás interesado en la primera versión detallada.
        }));


        console.log("Imagenes", pokemonData.sprites)

        // Obtener detalles de la especie del Pokémon para género, generación y descripción
        const speciesResponse = await fetch(`${BASE_URL}/pokemon-species/${name}`);
        if (!speciesResponse.ok) {
            throw new Error('No se encontró información de especie del Pokémon');
        }
        const speciesData = await speciesResponse.json();
        // Tasa de Captura
        pokemonData.captureRate = speciesData.capture_rate;
        // Hábitat
        pokemonData.habitat = speciesData.habitat ? speciesData.habitat.name : "Desconocido";

        // Generación y Ratio de Género
        const generationNumber = romanToDecimal(speciesData.generation.name.split('-')[1]); 
        pokemonData.generation = generationNumber;
        const malePercentage = speciesData.gender_rate * 12.5;
        const femalePercentage = 100 - malePercentage;
        pokemonData.gender = {
            male: malePercentage,
            female: femalePercentage
        };

        // Descripción del Pokémon
        const pokedexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
        if (pokedexEntry) {
            pokemonData.description = pokedexEntry.flavor_text;
        } else {
            pokemonData.description = "Descripción no disponible";
        }

        // Cadena de Evolución
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        pokemonData.evolutionChain = [];
        let currentEvolution = evolutionData.chain;
        while (currentEvolution) {
            pokemonData.evolutionChain.push({
                species_name: currentEvolution.species.name,
                evolves_to: currentEvolution.evolves_to.map(evo => evo.species.name),
                evolution_details: currentEvolution.evolves_to.map(evo => evo.evolution_details[0])
            });
            currentEvolution = currentEvolution.evolves_to[0];
        }

        return pokemonData;
    } catch (error) {
        throw error;
    }
};


export const getPokemonDetailsMoves = async (name) => {
    try {
        // Obtener detalles básicos del Pokémon
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('No se encontró el Pokémon');
        }
        const pokemonData = await response.json();

        // Almacenar debilidades
        let weaknesses = [];
        for (const typeInfo of pokemonData.types) {
            const typeResponse = await fetch(`${BASE_URL}/type/${typeInfo.type.name}`);
            const typeData = await typeResponse.json();
            for (const damageRelation of typeData.damage_relations.double_damage_from) {
                if (!weaknesses.includes(damageRelation.name)) {
                    weaknesses.push(damageRelation.name);
                }
            }
        }
        pokemonData.weaknesses = weaknesses;
       
        // Mapea usando el objeto original
        pokemonData.movesDetailed = pokemonData.moves.map(move => ({
            name: move.move?.name,
            learnMethod: move.version_group_details[0]?.move_learn_method?.name, 
            levelLearnedAt: move.version_group_details[0]?.level_learned_at 
        }));
        

        // Sprites
        pokemonData.sprites = {
            profile: pokemonData.sprites?.other?.['official-artwork'].front_default,
        }

        // Después de obtener los detalles básicos del Pokémon...
        console.log("Lugares", pokemonData.location_area_encounters)
        const locationResponse = await fetch(pokemonData.location_area_encounters);
        if (!locationResponse.ok) {
            throw new Error('No se encontraron áreas de encuentro para el Pokémon');
        }
        const locationData = await locationResponse.json();
        
        pokemonData.locations = locationData.map(location => ({
            location: location.location_area.name.split('-').join(' '), // Convertir nombres como "pallet-town" a "pallet town"
            methods: location.version_details[0].encounter_details.map(detail => detail.method.name) // Esto asume que sólo estás interesado en la primera versión detallada.
        }));


        console.log("Imagenes", pokemonData.sprites)

        // Obtener detalles de la especie del Pokémon para género, generación y descripción
        const speciesResponse = await fetch(`${BASE_URL}/pokemon-species/${name}`);
        if (!speciesResponse.ok) {
            throw new Error('No se encontró información de especie del Pokémon');
        }
        const speciesData = await speciesResponse.json();
        // Tasa de Captura
        pokemonData.captureRate = speciesData.capture_rate;
        // Hábitat
        pokemonData.habitat = speciesData.habitat ? speciesData.habitat.name : "Desconocido";

        // Generación y Ratio de Género
        const generationNumber = romanToDecimal(speciesData.generation.name.split('-')[1]); 
        pokemonData.generation = generationNumber;
        const malePercentage = speciesData.gender_rate * 12.5;
        const femalePercentage = 100 - malePercentage;
        pokemonData.gender = {
            male: malePercentage,
            female: femalePercentage
        };

        // Descripción del Pokémon
        const pokedexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
        if (pokedexEntry) {
            pokemonData.description = pokedexEntry.flavor_text;
        } else {
            pokemonData.description = "Descripción no disponible";
        }

        // Cadena de Evolución
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        pokemonData.evolutionChain = [];
        let currentEvolution = evolutionData.chain;
        while (currentEvolution) {
            pokemonData.evolutionChain.push({
                species_name: currentEvolution.species.name,
                evolves_to: currentEvolution.evolves_to.map(evo => evo.species.name),
                evolution_details: currentEvolution.evolves_to.map(evo => evo.evolution_details[0])
            });
            currentEvolution = currentEvolution.evolves_to[0];
        }

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






