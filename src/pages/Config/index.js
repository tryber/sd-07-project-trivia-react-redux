import React, { Component } from 'react';
import { ConfigForm, Title } from '../../components';
import './style.css';

class Config extends Component {

  contentMain() {
    return (
      <div className="config-content-child config-main">
        <div className="config-flex-basis-center">
          <div className="config-content-main">
            <ConfigForm />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="config-container">
        <div className="config-content">
          <Title title="Configurações" dataTestid="settings-title" />
          {this.contentMain()}
        </div>
      </div>
    );
  }
}

export default Config;
