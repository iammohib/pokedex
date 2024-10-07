// Imports
import './PokemonList.css'
import { PokemonCard, Btn } from '../index'; // Importing the PokemonCard and Btn components
import usePokemonData from '../../hooks/usePokemonsData'; // Helper function to fetch Pokémon data

function PokemonList() {
  // Using custom hook to retrieve and update Pokémon list state
  const [pokemonListState, setPokemonListState] = usePokemonData()

  // Destructuring state for easier access
  const { count, range, pokemonDataList, loading, prevApiUrl, nextApiUrl, error } = pokemonListState;

  return (
    <div className='PokemonList'>
      {/* Display the header */}
      Pokemon List
      {/* Display the total count of Pokémon */}
      <div>{count}</div>
      {/* Display the range of Pokémon in the current set */}
      <div>{range}</div>

      {/* Container for all Pokémon cards */}
      <div className="pokemon-card">
        {/* If data is loading, show a loading message; otherwise, render Pokémon cards */}
        {loading ? <div className="spinner">Loading...</div> : error ? (
          <div className="error">{error}</div> // Show error message if fetching fails
        ) : (
          // Map through the list of Pokémon and render PokemonCard components for each
          pokemonDataList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id} // Unique key for each Pokémon card
              id={pokemon.id} // Pokémon ID
              image={pokemon.image} // Pokémon image URL
              name={pokemon.name} // Pokémon name
              cries={pokemon.cries} // Pokémon cries (sound)
            />
          ))
        )}
      </div>

      {/* Pagination buttons to navigate between pages */}
      <div className="pagination">
        {/* 'Previous' button: Disabled if there's no previous URL */}
        <Btn variant="primary" onClick={() =>
          setPokemonListState(prevState => ({
            ...prevState,
            currentApiUrl: prevState.prevApiUrl // Update the API URL to the previous one
          }))
        } disabled={!prevApiUrl}>
          Previous
        </Btn>

        {/* 'Next' button: Disabled if there's no next URL */}
        <Btn variant="primary" onClick={() =>
          setPokemonListState(prevState => ({
            ...prevState,
            currentApiUrl: prevState.nextApiUrl // Update the API URL to the next one
          }))
        } disabled={!nextApiUrl}>
          Next
        </Btn>
      </div>

    </div>
  )
}

export default PokemonList;
