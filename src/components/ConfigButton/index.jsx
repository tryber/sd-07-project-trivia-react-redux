import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import iconSettings from './images/setting.svg';
import './style.css';

class ConfigButton extends Component {
  render() {
    return (
      //  trocar o <a> para o <link> e descomentar a linha 2
      <a to="/config" className="configButton-container">
        <img
          src={ iconSettings }
          alt="Botão de configuração"
          className="configButton-icon"
        />
      </a>
    );
  }
}

export default ConfigButton;
