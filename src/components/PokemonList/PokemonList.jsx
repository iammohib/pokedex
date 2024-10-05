// Importing React, hooks, and required libraries
import React, { useEffect, useState } from 'react'
import './PokemonList.css'
import { PokemonCard, Btn } from '../index'; // Importing the PokemonCard and Btn components
import getPokemonData from '../../Helpers/getPokemonData'; // Helper function to fetch Pokémon data

function PokemonList() {
  // Setting up the initial state for the component using useState
  const [pokemonListState, setPokemonListState] = useState({
    currentApiUrl: 'https://pokeapi.co/api/v2/pokemon/', // Initial API URL for fetching Pokémon
    pokemonDataList: [], // Array to store the list of Pokémon
    count: 0, // Total number of Pokémon
    prevApiUrl: '', // URL for the previous set of Pokémon
    nextApiUrl: '', // URL for the next set of Pokémon
    range: '', // Range of Pokémon displayed
    loading: true, // Loading state
    error: null, // Error state
  });

  // Destructuring state for easier access
  const { currentApiUrl, count, range, pokemonDataList, loading, prevApiUrl, nextApiUrl, error } = pokemonListState;

  // useEffect hook to fetch data whenever the `currentApiUrl` changes (pagination)
  useEffect(() => {
    // Call getPokemonData function to fetch Pokémon data and update the state
    getPokemonData(pokemonListState, setPokemonListState)
      .catch(err =>
        // Handle errors by updating the error state
        setPokemonListState(prevState => ({
          ...prevState,
          loading: false, // Stop loading when an error occurs
          error: 'Failed to fetch data' // Set the error message
        }))
      );
  }, [currentApiUrl]); // Dependency array includes `currentApiUrl` to trigger data fetching when it changes

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
