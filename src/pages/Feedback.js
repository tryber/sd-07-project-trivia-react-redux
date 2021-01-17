import React, { Component } from 'react';
import { Header } from '../components';

class Feedback extends Component {
  render() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = getLocalStorage;
    return (
      <div>
        <Header updateScore={ score } />
        <div>
          <span data-testid="feedback-text" />
          <button
            className={ 'btn-visible' || 'btn-visible-hidden' }
            data-testid="btn-next"
            type="button"
          >
            Próximo
          </button>
        </div>
      </div>
    );
  }
}

export default Feedback;
