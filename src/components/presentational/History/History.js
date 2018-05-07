import React from 'react';
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
