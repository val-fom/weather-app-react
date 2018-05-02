import React, { Component } from 'react';
import Octicon from 'react-octicon';
import './Footer.css';
import owmLogo from './owmLogo.svg';

const Footer = () => (
  <footer>
    <a href="https://github.com/val-fom/weather-app" className="footer__link footer__link-gh">
      <Octicon name="mark-github" className="" />
    </a>
    <a href="https://openweathermap.org/api" className="footer__link footer__link-owm">
      <img src={owmLogo} alt="" />
    </a>
  </footer>
);

export default Footer;
