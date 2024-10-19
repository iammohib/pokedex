import { useEffect, useState } from "react";
import axios from "axios";

function usePokemonDetails(id) {
  // State to store Pokémon details
  const [pokemonDataDetails, setPokemonDataDetails] = useState({
    id, // Use the ID from the route parameters
    name: "", // Pokémon name
    image: "", // Pokémon image
    cries: "", // Pokémon cries if available
    weight: null, // Pokémon weight
    height: null, // Pokémon height
    types: [], // Pokémon types
    loading: true, // Loading state
    error: null, // Error state
    similarPokemonsList: [],
  });

  // API URL for fetching Pokémon details based on the given ID
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  // Function to fetch Pokémon data asynchronously
  const fetchPokemonData = async () => {
    // Start loading and reset error before fetching
    setPokemonDataDetails((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    try {
      // Perform GET request to the Pokémon API
      const { data } = await axios.get(url);
      const { name, sprites, cries, weight, height, types } = data;

      // Fetching Pokémon data for each type
      const typesArray = types.map((t) => t.type.name);
      const typeRequests = await typesArray.map((type) =>
        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      );
      const typeResponses = await axios.all(typeRequests);

      // Flatten and extract Pokémon data from the responses
      const pokemonList = typeResponses
        .map((response) => response.data.pokemon.slice(0, 5))
        .flat()
        .map((entry) => entry.pokemon)
        .filter(
          (obj, index, self) =>
            obj.name !== name &&
            index === self.findIndex((o) => o.name === obj.name)
        );

      // Fetch detailed Pokémon data
      const pokemonDetailsPromises = pokemonList.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonDetailsResults = await Promise.allSettled(
        pokemonDetailsPromises
      );

      // Filter and extract fulfilled responses
      const similarPokemons = await pokemonDetailsResults
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

      // Update state with fetched Pokémon details
      setPokemonDataDetails({
        id,
        name: name, // Pokémon name
        image:
          sprites?.other?.dream_world?.front_default || "default_image_url", // Handle missing images
        cries: cries?.latest || null, // Handle missing cries
        weight: weight, // Pokémon weight
        height: height, // Pokémon height
        types: types.map((t) => t.type.name), // Map Pokémon types
        loading: false, // Data fetched, stop loading
        error: null, // Reset error state
        similarPokemonsList: similarPokemons, // array of similar Pokemon details
      });
    } catch (err) {
      console.error("Error fetching Pokémon data:", err);
      // Set error message and stop loading on error
      setPokemonDataDetails((prevState) => ({
        ...prevState,
        loading: false,
        error: "Failed to fetch Pokémon data. Please try again later.",
      }));
    }
  };

  // useEffect to fetch data when the component mounts or when the ID changes
  useEffect(() => {
    fetchPokemonData();
  }, [id]); // Add `id` as a dependency to refetch when `id` changes

  return [pokemonDataDetails, setPokemonDataDetails];
}

export default usePokemonDetails;
