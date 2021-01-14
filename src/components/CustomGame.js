import React from 'react';
import PropTypes from 'prop-types';
import { scrambler } from '../services';

const CustomGame = ({ challenge, correct }) => {
  const correctAnswer = challenge[0].correct_answer;
  const answersArray = scrambler([...challenge[0].incorrect_answers, correctAnswer]);
  return (
    <div>

      <h1 data-testid="question-category">{ challenge[0].category}</h1>
      <h3 data-testid="question-text">{ challenge[0].question}</h3>
      {answersArray.map((item, index) => (
        <button
          type="button"
          key={ index }
          onClick={ correct }
          data-testid={
            item === correctAnswer
              ? 'correct-answer'
              : `wrong-answer-${index}`
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
};

CustomGame.propTypes = {
  challenge: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;
export default CustomGame;
