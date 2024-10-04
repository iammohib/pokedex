import { Link } from 'react-router-dom'
import './App.css'
import { SearchBar } from './components'
import CustomRoutes from './routes/CustomRoutes'

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
