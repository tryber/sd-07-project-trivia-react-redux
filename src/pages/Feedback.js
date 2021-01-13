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
  }

  handleClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
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
