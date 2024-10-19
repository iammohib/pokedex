import { PokemonDetails, PokemonList } from '../components'
import { Route, Routes } from 'react-router-dom'

function CustomRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PokemonList />} />
      <Route path='/pokemon/:id' element={<PokemonDetails />} />
    </Routes>
  )
}

export default CustomRoutes
