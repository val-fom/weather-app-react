import React from 'react';
import logo from './react-logo.svg';
import './Header.css';

const Header = () => (
  <header className="header">
    <h1 className="header__heading">
      <a href="/">Weather App</a>
    </h1>
    <img
      src={logo}
      className="header__react-logo"
      alt="react-logo"
      title="react version"
    />
  </header>
);

export default Header;
