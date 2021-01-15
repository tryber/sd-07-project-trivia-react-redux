import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeedbackMSG extends Component {
  render() {
    const { player, handlePlayAgain } = this.props;
    const { assertions, score } = player;
    const msg1 = 'Podia ser melhor...';
    const msg2 = 'Mandou bem!';
    const tres = 3;
    console.log(assertions);
    return (
      <div>
        <h1 data-testid="feedback-text">
          {assertions < tres ? msg1 : msg2}
          {' '}
        </h1>
        <h2 data-testid="feedback-total-score">
          {score}
        </h2>
        <h2 data-testid="feedback-total-question">
          {assertions}
        </h2>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => handlePlayAgain() }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default FeedbackMSG;

FeedbackMSG.propTypes = {
  assertions: PropTypes.number.isRequired,
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  handlePlayAgain: PropTypes.func.isRequired,
};
