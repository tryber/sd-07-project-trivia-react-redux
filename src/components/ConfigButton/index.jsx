import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iconSettings from './images/setting.svg';
import './style.css';

class ConfigButton extends Component {
  render() {
    return (
      <Link to="/config" className="configButton-container" data-testid="btn-settings">
        <img
          src={ iconSettings }
          alt="Botão de configuração"
          className="configButton-icon"
        />
      </Link>
    );
  }
}

export default ConfigButton;
