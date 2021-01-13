import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FeedBackScore extends Component {
  render() {
    const { assertions, score } = this.props;
    const threeAssertions = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          { assertions >= threeAssertions
            ? 'Mandou bem!'
            : 'Podia ser melhor...'}
        </p>
        <p>Pontuação: </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p> Acertos: </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

FeedBackScore.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default FeedBackScore;
