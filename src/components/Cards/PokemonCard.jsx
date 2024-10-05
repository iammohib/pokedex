import React, { useRef, useEffect } from 'react'; // Importing necessary React hooks and components
import './PokemonCard.css'; // Importing the CSS for styling the Pokemon card
import { Btn } from '../index'; // Importing the Btn component from the index file
import { Link } from 'react-router-dom'; // Importing Link from React Router for navigation
import PropTypes from 'prop-types'

function PokemonCard({ id, name, image, cries }) {
  // Create a reference to the audio element
  const audioRef = useRef(null);

  // Function to handle the mouse over event and play audio
  const handleCardClick = () => {
    if (audioRef.current && cries) {
      // Play audio if it exists and cries prop is provided
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error); // Log any errors that occur while playing
      });
    }
  };

  // Cleanup the audio element when the component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause audio when component unmounts
        audioRef.current.currentTime = 0; // Reset playback position to the start
      }
    };
  }, []); // Empty dependency array means this effect runs on unmount only

  return (
    <div className='PokemonCard'>
      <div className='pokemon-img'>
        <img src={image} alt={`${name} image`} /> {/* Displaying the Pokemon image */}
      </div>
      <h2>{name}</h2> {/* Displaying the Pokemon name */}

      {/* Render Sound button only if cries are available */}
      {cries && (
        <Btn onClick={handleCardClick} aria-label={`Play sound for ${name}`}>
          Sound
        </Btn>
      )}

      <Link to={`/pokemon/${id}`}>
        {/* Link to navigate to the details page of the Pokemon */}
        <Btn aria-label={`View details for ${name}`}>View Details</Btn>
      </Link>

      {/* Audio element to play the cries sound */}
      <audio ref={audioRef} src={cries} />
    </div>
  );
}


// Adding PropTypes validation
PokemonCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Can be a string or number, as IDs may vary
  name: PropTypes.string.isRequired, // Name should be a required string
  image: PropTypes.string.isRequired, // Image source should be a required string
  cries: PropTypes.string, // Optional, as cries may not always be provided
};

export default PokemonCard; // Exporting the PokemonCard component for use in other parts of the application
