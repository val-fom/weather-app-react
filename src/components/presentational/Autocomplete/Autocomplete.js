import React from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';

const Autocomplete = ({ predictions, isActive, searchByPrediction }) => {
  if (!predictions.length) return null;

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
                searchByPrediction({
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

Autocomplete.propTypes = {
  predictions: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  searchByPrediction: PropTypes.func.isRequired,
};
