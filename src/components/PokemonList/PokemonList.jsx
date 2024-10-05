// Importing React, hooks, and required libraries
import React, { useEffect, useState } from 'react'
import './PokemonList.css'
import { PokemonCard, Btn } from '../index';
import getPokemonData from '../../Helpers/getPokemonData';

function PokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    currentApiUrl: 'https://pokeapi.co/api/v2/pokemon/',
    pokemonDataList: [],
    count: 0,
    prevApiUrl: '',
    nextApiUrl: '',
    range: '',
    loading: true
  });

  const { currentApiUrl,count, range, pokemonDataList, loading, prevApiUrl, nextApiUrl } = pokemonListState;

  // useEffect hook to fetch data whenever the ` currentApiUrl` changes (pagination)
  useEffect(() => {
    getPokemonData(pokemonListState, setPokemonListState)
      .catch(err => setPokemonListState(prevState => ({
        ...prevState,
        loading: false,
        error: 'Failed to fetch data'
      })));
  }, [currentApiUrl])

  return (
    <div className='PokemonList'>
      Pokemon List
      <div>{count}</div>
      <div>{range}</div>

      {/* Container for all Pokémon cards */}
      <div className="pokemon-card">
        {/* If data is loading, show a loading message; otherwise, render Pokémon cards */}
        {loading ? <div className="spinner">Loading...</div> : pokemonDataList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            types={pokemon.types}
            cries={pokemon.cries}
          />
        ))}
      </div>

      {/* Pagination buttons to navigate between pages */}
      <div className="pagination">
        {/* 'Previous' button: Disabled if there's no previous URL */}
        <Btn variant="primary" onClick={() => setPokemonListState(prevState => ({
          ...prevState,
          currentApiUrl: prevState.prevApiUrl
        }))} disabled={!prevApiUrl}>
          Previous
        </Btn>

        {/* 'Next' button: Disabled if there's no next URL */}
        <Btn variant="primary" onClick={() => setPokemonListState(prevState => ({
          ...prevState,
          currentApiUrl: prevState.nextApiUrl
        }))} disabled={!nextApiUrl}>
          Next
        </Btn>
      </div>

    </div>
  )
}

export default PokemonList
