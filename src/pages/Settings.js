import React from 'react';
/* import { connect } from 'react-redux'; */

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    /* const { token } = this.props; */
    return (
      <div>
        <h1
          data-testid="settings-title"
        >
          Configurações
        </h1>
      </div>
    );
  }
}

export default Settings;
