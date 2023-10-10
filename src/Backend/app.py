from flask import Flask, jsonify
import BaseData
from flask_cors import CORS

app = Flask(__name__)
# Configura CORS para permitir solicitudes desde todos los orígenes (*)
CORS(app)

@app.route('/pokemons', methods=['GET'])
def get_all_pokemons2():
    pokemons = BaseData.get_all_pokemons()
    formatted_pokemons = []
    for pokemon_data in pokemons:
        formatted_pokemon = {
            "name": pokemon_data[1],
            "url": pokemon_data[2]
        }
        formatted_pokemons.append(formatted_pokemon)

    return jsonify(formatted_pokemons)

@app.route('/pokemons_filtered', methods=['GET'])
def get_all_pokemons_filtered():
    print("entra1")
    pokemons_filtered = BaseData.get_all_pokemons_Filtered_Data()
    print("entra2")
    formatted_pokemons_filtered = []
    for pokemon_data in pokemons_filtered:
        formatted_pokemon_filtered = {
            "name": pokemon_data[1],
            "height": pokemon_data[2],
            "weight": pokemon_data[3]
        }
        formatted_pokemons_filtered.append(formatted_pokemon_filtered)

    return jsonify(formatted_pokemons_filtered)



@app.route('/test')
def get_pokemons():
    return jsonify(message="Test")


if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0')
