import { useParams } from "react-router-dom"
import { PokemonDetailsCard } from "../index";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails() {
    // Access URL parameters (id) using useParams
    const { id } = useParams();
    
    // Using custom hook to retrieve and update Pokémon list state
    const [pokemonDataDetails] = usePokemonDetails(20)
    const {name,image,cries,weight,height,types,loading,error} = pokemonDataDetails;

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
                    name={name} // Pokémon name
                    image={image} // Pokémon image URL
                    types={types} // Pokémon types
                    cries={cries} // Pokémon cries (sound)
                    weight={weight} // Pokémon weight
                    height={height} // Pokémon height
                />
            )}
        </div>
    )
}

export default PokemonDetails;
