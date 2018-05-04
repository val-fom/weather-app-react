import React from 'react';
import './History.css';

const HistoryList = ({ list, handleClick, clear }) => (
  <div className="history__container">
    <ul className="history">
      {list
        .map(city => (
          <li className="history__city">
            <a onClick={handleClick} href="#">
              {city}
            </a>
          </li>
        ))
        .reverse()}
    </ul>
    <button onClick={clear} className="history__clear-button button" title="clear history">
      <i>+</i>
    </button>
  </div>
);

export default HistoryList;
