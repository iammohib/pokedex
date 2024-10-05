import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PokemonList, PokemonDetails } from '../components'

function CustomRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PokemonList />} />
      <Route path='/pokemon/:id' element={<PokemonDetails />} />
    </Routes>
  )
}

export default CustomRoutes
