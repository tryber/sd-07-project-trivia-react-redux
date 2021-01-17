import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components';
import EndGame from './EndGame';

class Feedback extends Component {
  constructor() {
    super();
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  sendFeedback() {
    const { history } = this.props;
    history.push('/feedback');
  }

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
            onClick={ this.sendFeedback }
          >
            Próximo
          </button>
          <EndGame />
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Feedback;
