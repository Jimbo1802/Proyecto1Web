import requests
from concurrent.futures import ThreadPoolExecutor

BASE_URL = "https://pokeapi.co/api/v2"


def fetch_pokemon_details(name):
    try:
        response = requests.get(f"{BASE_URL}/pokemon/{name}")

        # Si el request no fue exitoso (HTTP status code no es 200)
        if response.status_code != 200:
            raise Exception('No se encontró el Pokémon')

        # Retorna el contenido de la respuesta como JSON (diccionario/lista en Python)
        return response.json()

    except requests.RequestException as e:
        # Si hay un error relacionado con la solicitud (por ejemplo, problemas de conexión)
        raise Exception(f"Error al hacer el request: {e}")
    except Exception as e:
        # Para cualquier otro tipo de error
        raise e


def fetch_pokemon_by_name(name):
    try:
        response = requests.get(f"{BASE_URL}/pokemon/{name}")
        # Si el request no fue exitoso (HTTP status code no es 200)
        if response.status_code != 200:
            raise Exception('No se encontró el Pokémon')
        # Obtener el contenido de la respuesta como JSON
        data = response.json()
        # Extraer sólo el nombre, altura y peso del Pokémon
        result = {
            "name": data["name"],
            "height": data["height"] / 10,
            "weight": data["weight"] / 10
        }
        return result
    except requests.RequestException as e:
        # Si hay un error relacionado con la solicitud (por ejemplo, problemas de conexión)
        raise Exception(f"Error al hacer el request: {e}")
    except Exception as e:
        # Para cualquier otro tipo de error
        raise e

def fetch_all_pokemons(url='https://pokeapi.co/api/v2/pokemon?limit=100'):
    response = requests.get(url)
    data = response.json()
    pokemons = data['results']
    
    if data['next']:
        next_pokemons = fetch_all_pokemons(data['next'])
        pokemons.extend(next_pokemons)
        
    return pokemons


def fetch_pokemon_details(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        detail_data = response.json()
        return {
            "name": detail_data["name"],
            "url": url,
            "height": detail_data["height"] / 10,
            "weight": detail_data["weight"] / 10
        }
    except requests.RequestException as e:
        raise Exception(f"Error al hacer la solicitud: {e}")

def fetch_all_pokemons_and_details():
    try:
        response = requests.get(f"{BASE_URL}/pokemon?limit=1300")
        response.raise_for_status()
        data = response.json()
        pokemons = data['results']

        # Utilizar un ThreadPoolExecutor con 10 hilos (puedes ajustar este número)
        with ThreadPoolExecutor(max_workers=10) as executor:
            # Mapear las solicitudes de detalles de Pokémon a los hilos
            details = executor.map(fetch_pokemon_details, [pokemon['url'] for pokemon in pokemons])

        return list(details)

    except requests.RequestException as e:
        raise Exception(f"Error al hacer la solicitud: {e}")



