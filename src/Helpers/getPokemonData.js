import axios from "axios";
import getQueryParamFromUrl from "./getQueryParamFromUrl";

// Function to fetch Pokémon data from the API
const getPokemonData = async (pokemonListState, setPokemonListState) => {
  const { currentApiUrl } = pokemonListState;

  // Set loading state to true before fetching
  setPokemonListState((prevState) => ({
    ...prevState,
    loading: true,
  }));

  try {
    // Fetch data from the PokeAPI using the current URL
    const resPokeapi = await axios.get(currentApiUrl);
    const { count, previous, next, results } = resPokeapi.data;

    // Make individual requests to get detailed data for each Pokémon
    const pokeapiData = await Promise.all(
      results.map((pokemon) => axios.get(pokemon.url))
    );

    // Map the API response to extract only the required Pokémon details
    const pokeapiDataList = pokeapiData.map(({ data: pokemonData }) => ({
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.other.dream_world.front_default,
      types: pokemonData.types,
      cries: pokemonData.cries ? pokemonData.cries.latest : null,
    }));

    // Calculate range for display (e.g., "1-20", "21-40", etc.)
    const offsetValue = parseInt(getQueryParamFromUrl(currentApiUrl, "offset")) || 0;
    const range = `${offsetValue + 1}-${offsetValue + pokeapiDataList.length}`;

    // Batch update the state once all data is processed
    setPokemonListState((prevState) => ({
      ...prevState,
      pokemonDataList: pokeapiDataList,
      count,
      prevApiUrl: previous,
      nextApiUrl: next,
      range,
      loading: false, // Set loading to false once data is fully loaded
    }));

  } catch (error) {
    // Handle errors and log them
    console.error("Failed to fetch Pokémon data:", error);
    setPokemonListState((prevState) => ({
      ...prevState,
      loading: false, // Stop loading in case of error
      error: "Failed to fetch Pokémon data. Please try again later."
    }));
  }
};

export default getPokemonData;
