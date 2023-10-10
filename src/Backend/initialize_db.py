import API
import BaseData


# Crear las tablas en la base de datos (si no existen)
BaseData.create_tables()

# Comprobar si ya hay datos en la base de datos
if not BaseData.get_all_pokemons():
    # Si no hay datos en la base de datos, entonces obtenemos y llenamos
    pokemons_and_details = API.fetch_all_pokemons_and_details()

    if pokemons_and_details:
        # Insertar tanto la lista de Pokémon como sus detalles en la base de datos
        BaseData.insert_pokemons_and_details(pokemons_and_details)
        print("Datos insertados en la base de datos")
    else:
        print("No se encontraron datos de Pokémon")

print("Base de datos inicializada")
