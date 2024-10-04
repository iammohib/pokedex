import { useRef } from 'react'
import { Btn } from '../index';
function PokemonDetailsCard({ id, name, image, types, cries, weight, height }) {
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
    <div className="pokemonCardWrapper">
      <div className='PokemonCard'>
        <div className='pokemon-img'>
          <img src={image} alt={name} />
        </div>
        <h2>{name}</h2>
        <Btn onClick={handleCardClick}>Sound</Btn>
        <audio ref={audioRef} src={cries}>
        </audio>
      </div>
      <h3>Height: {height}</h3>
      <h3>Weight: {weight}</h3>
      <h3>Types: {types && types.map((e) => <div key={e}>{e}</div>)}</h3>
    </div>
  )
}

export default PokemonDetailsCard
