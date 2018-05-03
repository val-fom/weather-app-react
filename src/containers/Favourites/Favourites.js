import React, { Component } from 'react';

import './Favourites.css';

export default class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: JSON.parse(localStorage.getItem('favourites')) || [],
    };
  }

  add = (item, key) => {
    const list = this.state.list.slice();
    const index = list.indexOf(item);
    if (item === list[list.length - 1]) return;
    if (~index) list.splice(index, 1);
    // ^ to move existing item to the end of the list
    list.push(item);
    localStorage.setItem(key, JSON.stringify(list));
    this.setState({ list });
  };

  clear = key => {
    localStorage.removeItem(key);
    this.setState({ list: [] });
  };

  handleClick = ev => {
    if (ev.target.tagName !== 'A') return;
    ev.preventDefault();
    const city = ev.target.innerHTML;
    this.props.onClick(city);
  };

  render() {
    const { list } = this.state;
    const { city } = this.props;

    return (
      <div className="favourites__container">
        <ul className="favourites">
          {list
            .map(city => (
              <li className="favourites__city">
                <a onClick={this.handleClick} href="#">
                  {city}
                </a>
              </li>
            ))
            .reverse()}
        </ul>
        <button
          onClick={() => this.add(city, 'favourites')}
          className="favourites__add-button button"
          title="add to favourites"
        >
          <i>+</i>
        </button>
        <button
          onClick={() => this.clear('favourites')}
          className="favourites__clear-button button"
          title="clear favourites"
        >
          <i>+</i>
        </button>
      </div>
    );
  }
}
