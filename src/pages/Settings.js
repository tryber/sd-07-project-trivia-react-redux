import React, { Component } from 'react';
import * as components from '../components';
import './Settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="settings-page">
        <h1 data-testid="settings-title" className="page-title">
          Settings
        </h1>
        <components.ButtonLogin />
      </div>
    );
  }
}

export default Settings;
