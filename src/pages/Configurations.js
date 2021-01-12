import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './login.css';

class Configurations extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1
          data-testid="settings-title"
        >
          Configurações
        </h1>
        <button
          type="button"
          onClick={ () => {
            history.push('/');
          } }
        >
          Voltar
        </button>
      </div>
    );
  }
}

export default Configurations;

Configurations.propTypes = {
  history: PropTypes.shape({}),
};