import React from 'react';
import PropTypes from 'prop-types';

const accetableQt = 3;
const FeedbackMessage = ({ score, assertions }) => (
  <>
    <h2 data-testid="feedback-text">
      { assertions >= accetableQt ? 'Mandou bem!' : 'Podia ser melhor...' }
    </h2>
    <span data-testid="feedback-total-score">{score}</span>
    <h2 data-testid="feedback-total-question">{assertions}</h2>
  </>
);

export default FeedbackMessage;

FeedbackMessage.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};
