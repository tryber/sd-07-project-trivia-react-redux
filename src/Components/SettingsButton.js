import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SettingsButton extends Component {
  render() {
    return (
      <div>
        <Link to="/settings">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </div>
    );
  }
}

export default SettingsButton;
