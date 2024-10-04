import React, { useRef } from 'react'
import './PokemonCard.css'
import {Btn} from '../index';
import { Link } from 'react-router-dom';

function PokemonCard({ id, name, image, types, cries }) {
  // Create a reference to the audio element
  const audioRef = useRef(null);

  // Function to handle the mouse over event and play audio
  const handleCardClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };
  return (
    <div className='PokemonCard'>
      <div className='pokemon-img'>
        <img src={image} alt={name} />
      </div>
      <h2>{name}</h2>
      <Btn onClick={handleCardClick}>Sound</Btn>
      <Link to={`/pokemon/${id}`}>
        <Btn>View Details</Btn>
      </Link>
      <audio ref={audioRef} src={cries}>
      </audio>
    </div>
  )
}

export default PokemonCard
