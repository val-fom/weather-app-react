import React, { Component } from 'react';
import './Footer.css';
import owmLogo from './owmLogo.svg';
import octicons from 'octicons';

const Footer = () => (
  <footer>
    <a href="https://github.com/val-fom/weather-app" className="footer__link footer__link-gh">
      {octicons['mark-github'].toSVG({ width: 19.2 })}
    </a>
    <a href="https://openweathermap.org/api" className="footer__link footer__link-owm">
      <img src={owmLogo} alt="" />
    </a>
  </footer>
);

export default Footer;
