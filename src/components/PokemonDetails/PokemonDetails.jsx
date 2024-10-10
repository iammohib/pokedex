import { useParams } from "react-router-dom"
import { PokemonCard, PokemonDetailsCard } from "../index";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import './PokemonDetails.css'

function PokemonDetails() {
    // Access URL parameters (id) using useParams
    const { id } = useParams();

    // Using custom hook to retrieve and update Pokémon list state
    const [pokemonDataDetails] = usePokemonDetails(id)
    const { name, image, cries, weight, height, types, loading, error, similarPokemonsList } = pokemonDataDetails;
    return (
        <div>
            {loading ? (
                // Show loading spinner while data is being fetched
                <div className="spinner">Loading...</div>
            ) : error ? (
                // Show error message if data fetching fails
                <div className="error">{error}</div>
            ) : (
                <>
                    <PokemonDetailsCard
                        id={id} // Pokémon ID
                        name={name} // Pokémon name
                        image={image} // Pokémon image URL
                        types={types} // Pokémon types
                        cries={cries} // Pokémon cries (sound)
                        weight={weight} // Pokémon weight
                        height={height} // Pokémon height
                    />

                    {/* Container for all Pokémon cards */}
                    <div className="similar-pokemon-card">
                        {/* If similarPokemonsList is empty, show a message; otherwise, render Pokémon cards */}
                        {similarPokemonsList.length > 0 ? (similarPokemonsList.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id} // Unique key for each Pokémon card
                                id={pokemon.id} // Pokémon ID
                                image={pokemon.image} // Pokémon image URL
                                name={pokemon.name} // Pokémon name
                                cries={pokemon.cries} // Pokémon cries (sound)
                            />
                        ))) : (
                            <div className="spinner">No similar Pokemon.</div>
                        )}
                    </div>
                </>
            )}

        </div>
    )
}

export default PokemonDetails;
