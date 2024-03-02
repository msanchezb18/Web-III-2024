// Home.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  url: string;
  number: number;
  height: number;
  weight: number;
  types: string[];
  moves: string[];
}

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [generation, setGeneration] = useState<number>(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${getOffset()}&limit=${getLimit()}`
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation]);

  function getPokemonImage(name: string) {
    return `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name.toLowerCase()}.png`;
  }

  const handlePokemonClick = async (pokemon: Pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      const details: PokemonDetails = {
        url: response.data.url,
        number: response.data.id,
        height: response.data.height,
        weight: response.data.weight,
        types: response.data.types.map((type: any) => type.type.name),
        moves: response.data.moves.map((move: any) => move.move.name),
      };
      setSelectedPokemon(details);
    } catch (error) {
      console.error("Error fetching Pokemon details: ", error);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const getOffset = () => {
    switch (generation) {
      case 2:
        return 151;
      case 3:
        return 251;
      case 4:
        return 386;
      case 5:
        return 493;
      default:
        return 0;
    }
  };

  const getLimit = () => {
    switch (generation) {
      case 2:
        return 100;
      case 3:
        return 135;
      case 4:
        return 107;
      case 5:
        return 156;
      default:
        return 151;
    }
  };

  return (
    <div>
      <div className="combo">
        <label className="label">Seleccione Generación: </label>
        <select
          className="select"
          onChange={(e) => setGeneration(Number(e.target.value))}
        >
          <option value={1}>Primera</option>
          <option value={2}>Segunda</option>
          <option value={3}>Tercera</option>
          <option value={4}>Cuarta</option>
          <option value={5}>Quinta</option>
        </select>
      </div>

      {pokemons.map((pokemon) => (
        <div
          className="Content"
          key={pokemon.name}
          onClick={() => handlePokemonClick(pokemon)}
        >
          <img
            src={getPokemonImage(pokemon.name)}
            alt={pokemon.name}
            style={{ width: "100px", height: "100px" }}
          />
          <h3>{pokemon.name}</h3>
        </div>
      ))}

      {selectedPokemon && (
        <div className="content">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Detalles de Pokémon</h2>
            <p>Número: {selectedPokemon.number}</p>
            <p>Altura: {selectedPokemon.height}</p>
            <p>Peso: {selectedPokemon.weight}</p>
            <p>Tipo(s): {selectedPokemon.types.join(", ")}</p>
            <p>Movimientos: {selectedPokemon.moves.join(", ")}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
