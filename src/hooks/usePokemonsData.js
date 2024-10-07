import React, { useEffect, useState } from "react";
import axios from "axios";
import getQueryParamFromUrl from "../Helpers/getQueryParamFromUrl";

// Custom hook to fetch Pokémon data from the API
const usePokemonData = () => {
  // Initial state
  const [pokemonListState, setPokemonListState] = useState({
    currentApiUrl: "https://pokeapi.co/api/v2/pokemon/", // Initial API URL
    pokemonDataList: [], // List of Pokémon
    count: 0, // Total number of Pokémon
    prevApiUrl: "", // Previous page URL
    nextApiUrl: "", // Next page URL
    range: "", // Pokémon range for display
    loading: true, // Loading state
    error: null, // Error state
  });

  const { currentApiUrl } = pokemonListState;

  // Function to fetch data from the API
  const fetchPokemonData = async () => {
    try {
      // Set loading state to true before fetching
      setPokemonListState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      // Fetch data from the Pokémon API
      const resPokeapi = await axios.get(currentApiUrl);
      const { count, previous, next, results } = resPokeapi.data;

      // Fetch detailed data for each Pokémon
      const pokeapiData = await Promise.allSettled(
        results.map((pokemon) => axios.get(pokemon.url))
      );

      // Filter fulfilled promises and map the data to extract relevant Pokémon details
      const pokeapiDataList = pokeapiData
        .filter(({ status }) => status === "fulfilled")
        .map(({ value: { data: pokemonData } }) => ({
          id: pokemonData.id,
          name: pokemonData.name,
          image:
            pokemonData.sprites?.other?.dream_world?.front_default ||
            "default_image_url",
          types: pokemonData.types,
          cries: pokemonData.cries?.latest || null,
        }));

      // Calculate range (e.g., "1-20", "21-40", etc.)
      const offsetValue =
        parseInt(getQueryParamFromUrl(currentApiUrl, "offset")) || 0;
      const range = `${offsetValue + 1}-${
        offsetValue + pokeapiDataList.length
      }`;

      // Update state with the fetched data
      setPokemonListState((prevState) => ({
        ...prevState,
        pokemonDataList: pokeapiDataList,
        count,
        prevApiUrl: previous,
        nextApiUrl: next,
        range,
        loading: false, // Data fully loaded
      }));
    } catch (error) {
      // Handle errors
      console.error("Failed to fetch Pokémon data:", error);
      setPokemonListState((prevState) => ({
        ...prevState,
        loading: false, // Stop loading on error
        error: "Failed to fetch Pokémon data. Please try again later.",
      }));
    }
  };

  // Fetch data whenever `currentApiUrl` changes
  useEffect(() => {
    fetchPokemonData();
  }, [currentApiUrl]);

  return [pokemonListState, setPokemonListState];
};

export default usePokemonData;
