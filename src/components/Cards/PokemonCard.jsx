import React from 'react'
import './PokemonCard.css'

function PokemonCard({ id, name, image, types }) {
  return (
    <div className='PokemonCard'>
      <div className='pokemon-img'>
        <img src={image} alt={name} />
      </div>
      <h2>{id}|{name}
      </h2>
    </div>
  )
}

export default PokemonCard
