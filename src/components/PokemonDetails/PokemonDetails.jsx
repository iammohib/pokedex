import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { PokemonDetailsCard } from "../index";

function PokemonDetails() {
    // Access URL parameters (id) using useParams
    const { id } = useParams();

    // State to store Pokémon details
    const [pokemonDataDetails, setPokemonDataDetails] = useState({});

    // Loading state to show spinner while data is being fetched
    const [loading, setLoading] = useState(true);

    // Error state to capture and display errors if any occur
    const [error, setError] = useState(null);

    // API URL for fetching Pokémon details based on the given ID
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    // Function to fetch Pokémon data asynchronously
    const getData = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error state before fetching

        try {
            // Perform GET request to the Pokémon API
            const response = await axios.get(url);
            // console.log(response.data); // Log response data for debugging

            // Extract necessary Pokémon data from the response
            const pokemonData = {
                id: id, // Use the ID from the route parameters
                name: response.data.name, // Pokémon name
                image: response.data.sprites.other.dream_world.front_default, // Pokémon image
                cries: response.data.cries ? response.data.cries.latest : "null", // Pokémon cries if available
                weight: response.data.weight, // Pokémon weight
                height: response.data.height, // Pokémon height
                types: response.data.types.map((t) => t.type.name) // Map Pokémon types to extract type names
            }

            // Update state with fetched Pokémon details
            setPokemonDataDetails(pokemonData);
        } catch (err) {
            // Log the error to the console and set error message in state
            console.error("Error fetching Pokémon data:", err);
            setError("Failed to load Pokémon data."); // Displayable error message
        } finally {
            // Stop loading state whether success or failure
            setLoading(false);
        }
    }

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        getData(); // Trigger the data fetching function
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div>
            {loading ? (
                // Show loading spinner while data is being fetched
                <div className="spinner">Loading...</div>
            ) : error ? (
                // Show error message if data fetching fails
                <div className="error">{error}</div>
            ) : (
                // Render the PokémonDetailsCard component with fetched data
                <PokemonDetailsCard
                    id={id} // Pokémon ID
                    name={pokemonDataDetails.name} // Pokémon name
                    image={pokemonDataDetails.image} // Pokémon image URL
                    types={pokemonDataDetails.types} // Pokémon types
                    cries={pokemonDataDetails.cries} // Pokémon cries (sound)
                    weight={pokemonDataDetails.weight} // Pokémon weight
                    height={pokemonDataDetails.height} // Pokémon height
                />
            )}
        </div>
    )
}

export default PokemonDetails;
