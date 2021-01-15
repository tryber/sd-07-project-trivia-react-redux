import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      totalQuestions: 0,
      score: 0,
    };
    this.handleClickPlayAgain = this.handleClickPlayAgain.bind(this);
    this.handleClickRanking = this.handleClickRanking.bind(this);
  }

  handleClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  handleClickRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { totalQuestions, score } = this.state;
    const condition = 3;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          {totalQuestions < condition ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h2>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{totalQuestions}</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickPlayAgain }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ver Ranking
        </button>
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
