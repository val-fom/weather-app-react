import React from 'react';
import PropTypes from 'prop-types';
import './Favourites.css';

const Favourites = ({ list, handleClick, add, clear }) => (
  <div className="favourites__container">
    <ul className="favourites">
      {list
        .map(({ city, id }) => (
          <li className="favourites__city" key={id}>
            <a onClick={handleClick} href={`#/${city}`}>
              {city}
            </a>
          </li>
        ))
        .reverse()}
    </ul>
    <button
      onClick={add}
      className="favourites__add-button button"
      title="add to favourites"
    >
      <i>+</i>
    </button>
    <button
      onClick={clear}
      className="favourites__clear-button button"
      title="clear favourites"
    >
      <i>+</i>
    </button>
  </div>
);

export default Favourites;

Favourites.propTypes = {
  city: PropTypes.string,
  id: PropTypes.number,
  list: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Favourites.defaultProps = {
  city: undefined,
  id: undefined,
};
