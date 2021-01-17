import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components';

class Feedback extends Component {
  constructor() {
    super();
    this.goToRanking = this.goToRanking.bind(this);
    this.goHome = this.goHome.bind(this);
    this.state = {
    };
  }

  goToRanking() {
    const { history } = this.props;
    history.push('./ranking');
  }

  goHome() {
    const { history } = this.props;
    history.push('./');
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
          >
            Próximo
          </button>
          <button
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
            type="button"
          >
            Ver Ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.goHome }
          >
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
