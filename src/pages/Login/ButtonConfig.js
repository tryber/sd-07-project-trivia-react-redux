import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonConfig extends Component {
  render() {
    return (
      <Link to="/settings">
        <button type="button" data-testid="btn-settings">
          Configurações
        </button>
      </Link>
    );
  }
}

export default ButtonConfig;
