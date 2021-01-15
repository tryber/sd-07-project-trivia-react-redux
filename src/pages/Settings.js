import React, { Component } from 'react';
import * as components from '../components';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">
          Configurações
        </h1>
        <components.ButtonLogin />
      </div>
    );
  }
}

export default Settings;
