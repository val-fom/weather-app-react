import React from 'react';

const FavouritesList = ({ list, handleClick, add, clear }) => (
  <div className="favourites__container">
    <ul className="favourites">
      {list
        .map(city => (
          <li className="favourites__city">
            <a onClick={handleClick} href="#">
              {city}
            </a>
          </li>
        ))
        .reverse()}
    </ul>
    <button onClick={add} className="favourites__add-button button" title="add to favourites">
      <i>+</i>
    </button>
    <button onClick={clear} className="favourites__clear-button button" title="clear favourites">
      <i>+</i>
    </button>
  </div>
);

export default FavouritesList;
