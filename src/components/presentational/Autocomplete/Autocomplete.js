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
          <li className="autocomplete__li" key={prediction.placeId}>
            <a
              className="autocomplete__a"
              href={`#/${prediction.placeId}`}
              onClick={ev => {
                ev.preventDefault();
                handleClick({
                  placeId: prediction.placeId,
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
