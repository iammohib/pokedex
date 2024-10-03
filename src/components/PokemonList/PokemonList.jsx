// Importing React, hooks, and required libraries
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PokemonList.css'
import PokemonCard from '../Cards/PokemonCard';
import Btn from '../Buttons/Btn';

function PokemonList() {
  // State variables for API URL, Pokémon data, and navigation controls
  const [pokeapiUrl, setPokeapiUrl] = useState('https://pokeapi.co/api/v2/pokemon/?offset=190&limit=20')
  const [pokemonDataList, setPokemonDataList] = useState([])
  const [count, setCount] = useState(0);
  const [prevApiUrl, setPrevApiUrl] = useState('');
  const [nextApiUrl, setNextApiUrl] = useState('');
  const [range, setRange] = useState('');
  const [loading, setLoading] = useState(true)

  // Helper function to extract the "offset" query parameter from the API URL
  function getOffsetFromUrl(url) {
    // Create a URL object from the string
    const urlObj = new URL(url);

    // Get the search parameters
    const params = new URLSearchParams(urlObj.search);

    // Get the offset value
    const offset = params.get('offset');

    // Return the offset value as a number (or null if not found)
    return offset ? Number(offset) : "none";
  }

  // Function to fetch Pokémon data from the API
  const getPokemonData = async () => {
    // Fetching data from the PokeAPI using the current URL
    const resPokeapi = await axios.get(pokeapiUrl)

    // Setting state variable, as fetched data
    setCount(resPokeapi.data.count)
    setPrevApiUrl(resPokeapi.data.previous)
    setNextApiUrl(resPokeapi.data.next)

    // Extract the array of Pokémon entries
    const pokeapiResult = resPokeapi.data.results;

    // Make individual requests to get detailed data for each Pokémon
    const pokeapiResultPromise = pokeapiResult.map(async (e) => await axios.get(e.url))
    const pokeapiData = await axios.all(pokeapiResultPromise)

    // Map the API response to extract only the required Pokémon details
    const pokeapiDataList = pokeapiData.map((e) => {
      const pokemonData = e.data;
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.other.dream_world.front_default,
        types: pokemonData.types,
      }
    })

    // Update the state with the processed Pokémon data
    setPokemonDataList(pokeapiDataList)
    // console.log(pokeapiDataList)

    // Determine the range of Pokémon displayed (e.g., "191-210")
    const offsetValue = getOffsetFromUrl(pokeapiUrl)
    const rangevalues = `${offsetValue + 1}-${offsetValue + 20}`
    setRange(rangevalues)

    // Set loading state to false once data is loaded
    setLoading(false)
  }

  // useEffect hook to fetch data whenever the `pokeapiUrl` changes (pagination)
  useEffect(() => {
    getPokemonData()
  }, [pokeapiUrl])

  return (
    <div className='PokemonList'>
      Pokemon List
      <div>{count}</div>
      <div>{range}</div>

      {/* Container for all Pokémon cards */}
      <div className="pokemon-card">
        {/* If data is loading, show a loading message; otherwise, render Pokémon cards */}
        {(!loading) ? pokemonDataList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            types={pokemon.types}
          />
        )) : 'loading.....'}
      </div>

      {/* Pagination buttons to navigate between pages */}
      <div className="pagination">
        {/* 'Previous' button: Disabled if there's no previous URL */}
        <Btn variant="primary" onClick={() => { setPokeapiUrl(prevApiUrl); setLoading(true) }} disabled={Boolean(!prevApiUrl)}>
          Previous
        </Btn>

        {/* 'Next' button: Disabled if there's no next URL */}
        <Btn variant="primary" onClick={() => { setPokeapiUrl(nextApiUrl); setLoading(true) }} disabled={Boolean(!nextApiUrl)}>
          Next
        </Btn>
      </div>

    </div>
  )
}

export default PokemonList
