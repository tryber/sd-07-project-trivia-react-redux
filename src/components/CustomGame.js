import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

export default function CustomGame(
  { challenge, correct, changeStyle, index },
) {
  return (
    <div>
      <h1 data-testid="question-category">{challenge[index].category}</h1>
      <h3 data-testid="question-text">{challenge[index].question}</h3>
      <button
        onClick={ correct }
        type="button"
        key="correct"
        data-testid="correct-answer"
        className={ changeStyle ? 'correct' : '' }
      >
        {challenge[index].correct_answer}
      </button>

      {challenge[0].incorrect_answers.map((item, index1) => (
        <button
          onClick={ correct }
          type="button"
          key="incorrect"
          data-testid={ `wrong-answer-${index1}` }
          className={ changeStyle ? 'incorrect' : '' }
        >
          {item}
        </button>
      ))}
    </div>
  );
}

CustomGame.propTypes = {
  challenge: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;
