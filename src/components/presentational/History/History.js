import React from 'react';
import PropTypes from 'prop-types';
import './History.css';

const History = ({ list, search, clear }) => (
  <div className="history__container">
    <ul className="history">
      {list
        .map(({ cityName, cityId }) => (
          <li className="history__city" key={cityId}>
            <a
              href={`#/${cityId}`}
              onClick={ev => {
                // TODO: move this to the handleClick method
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
      onClick={clear}
      className="history__clear-button button"
      title="clear history"
    >
      <i>+</i>
    </button>
  </div>
);

export default History;

// History.propTypes = {
//   cityName: PropTypes.string,
//   cityId: PropTypes.number,
//   list: PropTypes.array.isRequired,
//   clear: PropTypes.func.isRequired,
//   search: PropTypes.func.isRequired,
// };

// History.defaultProps = {
//   cityName: undefined,
//   cityId: undefined,
// };
