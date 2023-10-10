import sqlite3

DB_NAME = 'pokemon_data.db'

def create_tables():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Creación de la tabla Pokémon
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS pokemons (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL
    )''')

    # Creación de la tabla pokemons_Filtered_Data
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS pokemons_Filtered_Data (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        height REAL NOT NULL,
        weight REAL NOT NULL
    )''')
        
    conn.commit()
    conn.close()

def insert_pokemons(pokemons):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    for pokemon in pokemons:
        cursor.execute('''
        INSERT INTO pokemons (name, url) VALUES (?, ?)
        ''', (pokemon['name'], pokemon['url']))
    
    conn.commit()
    conn.close()

def get_all_pokemons():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM pokemons')
    pokemons = cursor.fetchall()
    
    conn.close()
    return pokemons


def insert_pokemons_Filtered_Data(cls, pokemons):
    conn = sqlite3.connect(cls.DB_NAME)
    cursor = conn.cursor()   
    for pokemon in pokemons:
        cursor.execute('''
        INSERT INTO pokemons_Filtered_Data (name, height, weight) VALUES (?, ?, ?)
        ''', (pokemon['name'], pokemon['height'], pokemon['weight']))        
        conn.commit()
        conn.close()

def get_all_pokemons_Filtered_Data():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM pokemons_Filtered_Data')
    pokemons = cursor.fetchall()
    conn.close()
    return pokemons

def insert_pokemons_and_details(pokemons_and_details):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    for pokemon_details in pokemons_and_details:
        cursor.execute('''
        INSERT INTO pokemons (name, url) VALUES (?, ?)
        ''', (pokemon_details['name'], pokemon_details['url']))  # Incluir la URL aquí

        cursor.execute('''
        INSERT INTO pokemons_Filtered_Data (name, height, weight) VALUES (?, ?, ?)
        ''', (pokemon_details['name'], pokemon_details['height'], pokemon_details['weight']))

    conn.commit()
    conn.close()




