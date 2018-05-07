import React from 'react';
import PropTypes from 'prop-types';
import './History.css';

const History = ({ list, handleClick, clear }) => (
  <div className="history__container">
    <ul className="history">
      {list
        .map(({ city, id }) => (
          <li className="history__city" key={id}>
            <a onClick={handleClick} href={`#/${city}`}>
              {city}
            </a>
          </li>
        ))
        .reverse()}
    </ul>
    <button
      onClick={clear}
      className="history__clear-button button"
      title="clear history"
    >
      <i>+</i>
    </button>
  </div>
);

export default History;

History.propTypes = {
  city: PropTypes.string,
  id: PropTypes.number,
  list: PropTypes.array.isRequired,
  clear: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

History.defaultProps = {
  city: undefined,
  id: undefined,
};
