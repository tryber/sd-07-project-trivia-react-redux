import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <header data-testid="settings-title">
        <h1>
          Configurações
        </h1>
        <div>
          <Link to="/">Voltar</Link>
        </div>
      </header>
    );
  }
}

export default Settings;
