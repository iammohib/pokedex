import axios from "axios";
import { useEffect, useState } from "react";

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

      // Update state with fetched Pokémon details
      setPokemonDataDetails({
        id,
        name: data.name, // Pokémon name
        image:
          data.sprites?.other?.dream_world?.front_default ||
          "default_image_url", // Handle missing images
        cries: data.cries?.latest || null, // Handle missing cries
        weight: data.weight, // Pokémon weight
        height: data.height, // Pokémon height
        types: data.types.map((t) => t.type.name), // Map Pokémon types
        loading: false, // Data fetched, stop loading
        error: null, // Reset error state
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
