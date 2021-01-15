import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gear from '../img/gear.svg';

class SettingsButton extends Component {
  render() {
    return (
      <div>
        <Link to="/settings">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            <img className="icon-gear" src={ gear } alt="Icone engrenagem" />
          </button>
        </Link>
      </div>
    );
  }
}

export default SettingsButton;
