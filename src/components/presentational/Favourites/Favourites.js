import React from 'react';
import PropTypes from 'prop-types';
import './Favourites.css';

const Favourites = ({ list, search, add, clear }) => (
  <div className="favourites__container">
    <ul className="favourites">
      {list
        .map(({ cityName, cityId }) => (
          <li className="favourites__city" key={cityId}>
            <a
              href={`#/${cityId}`}
              onClick={ev => {
                ev.preventDefault();
                search({ cityId });
              }}
            >
              {cityName}
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
  cityName: PropTypes.string,
  cityId: PropTypes.number,
  list: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

Favourites.defaultProps = {
  cityName: undefined,
  cityId: undefined,
};
