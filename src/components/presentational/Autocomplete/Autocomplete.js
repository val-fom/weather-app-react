import React from 'react';
import './Autocomplete.css';

const Autocomplete = ({ predictions, isActive, handleClick }) => {
  if (!predictions) return null;

  return (
    <div className="autocomplete__container">
      <ul
        className={`autocomplete__ul${isActive ? '' : ' autocomplete__hidden'}`}
      >
        {predictions.map(prediction => (
          <li className="autocomplete__li" key={prediction.place_id}>
            <a
              className="autocomplete__a"
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
    </div>
  );
};

export default Autocomplete;
