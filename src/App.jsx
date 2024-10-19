import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'
import { SearchBar } from './components'

function App() {
  return (
    <>
      <Link to={'/'}>
        POKEDEX
      </Link>
      <SearchBar />
      <CustomRoutes />
    </>
  )
}

export default App
