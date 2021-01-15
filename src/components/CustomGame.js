import React from 'react';
import PropTypes from 'prop-types';
import { CustomTimer } from '.';

import '../App.css';

const CustomGame = ({ challenge, correct, changeStyle, index, stopTimer }) => (
  <div className="questions">
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
    <CustomTimer stopTimer={ stopTimer } />

  </div>
);
CustomGame.propTypes = {
  challenge: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;
export default CustomGame;
