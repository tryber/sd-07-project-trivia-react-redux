import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ButtonConfig.css';

class ButtonConfig extends Component {
  render() {
    return (
      <Link to="/settings" className="config__link__container">
        <button type="button" className="config__link" data-testid="btn-settings">
          Configurações
        </button>
      </Link>
    );
  }
}

export default ButtonConfig;
