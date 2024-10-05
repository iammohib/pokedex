import { useRef, useEffect } from 'react';
import { Btn } from '../index';
import PropTypes from 'prop-types';

function PokemonDetailsCard({ id, name, image, types, cries, weight, height }) {
  // Create a reference to the audio element
  const audioRef = useRef(null); // Using useRef to hold the audio element reference

  // Function to handle the mouse click event and play audio
  const handleCardClick = () => {
    // Checks if audio element exists and if cries is provided
    if (audioRef.current && cries) {
      audioRef.current.play().catch(error => {
        // Logs error if audio playback fails
        console.error('Error playing audio:', error);
      });
    }
  };

  // Cleanup function to pause audio when component unmounts
  useEffect(() => {
    // Cleanup to pause audio and reset the time when component is unmounted
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the audio
        audioRef.current.currentTime = 0; // Reset the audio to the start
      }
    };
  }, []); // Empty dependency array ensures this effect runs only on unmount

  return (
    <div className="pokemonCardWrapper">
      <div className="PokemonCard">
        <div className="pokemon-img">
          <img src={image} alt={`${name} image`} /> {/* Image of the Pokemon */}
        </div>
        <h2>{name}</h2> {/* Displaying the name of the Pokemon */}
        {/* Render Sound button only if cries are available */}
        {cries && (
          <Btn onClick={handleCardClick} aria-label={`Play sound for ${name}`}>
            Sound
          </Btn>
        )}
        <audio ref={audioRef} src={cries}></audio> {/* Audio element for playing cries */}
      </div>
      <h3>Height: {height}</h3> {/* Displaying Pokemon's height */}
      <h3>Weight: {weight}</h3> {/* Displaying Pokemon's weight */}
      <h3>
        {/* Displaying types, if available, else showing 'No types available' */}
        Types: {types && types.length > 0 ? types.map((type, index) => <div key={`${type}-${index}`}>{type}</div>) : 'No types available'}
      </h3>
    </div>
  );
}

// Adding prop types validation for the PokemonDetailsCard component
PokemonDetailsCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,  // Can handle either number or string for ID
  name: PropTypes.string.isRequired, // Name is a required string
  image: PropTypes.string.isRequired, // Image URL is required
  types: PropTypes.arrayOf(PropTypes.string), // Types is an optional array of strings
  cries: PropTypes.string, // Cries (audio URL) is optional
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Weight can be a string or number, required
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Height can be a string or number, required
};

export default PokemonDetailsCard;
