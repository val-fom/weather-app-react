import React from 'react';
import './Autocomplete.css';

const Autocomplete = ({ predictions, isActive, handleClick }) => {
  if (!predictions) return null;

  return (
    <ul className={isActive ? '' : 'hidden'}>
      {predictions.map(prediction => (
        <li key={prediction.place_id}>
          <a
            href={`#/${prediction.place_id}`}
            onClick={ev => {
              ev.preventDefault();
              handleClick({
                placeId: prediction.place_id,
                description: prediction.description,
              });
            }}
          >
            {prediction.description}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Autocomplete;
