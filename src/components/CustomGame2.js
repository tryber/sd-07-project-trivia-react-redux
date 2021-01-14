import React from 'react';
import PropTypes from 'prop-types';
import { scrambler } from '../services';
const CustomGame = ({ challenge, correct, changeStyle , index  }) => {
  const correctAnswer = challenge[index].correct_answer;
  const answersArray = scrambler([...challenge[index].incorrect_answers, correctAnswer]);
  return (
    <div>
      <h1 data-testid="question-category">{ challenge[index].category}</h1>
      <h3 data-testid="question-text">{ challenge[index].question}</h3>
      {answersArray.map((item, index1) => (
        <button
          type="button"
          key={ index1 }
          onClick={ correct }

          data-testid={
            item === correctAnswer
              ? 'correct-answer'
              : `wrong-answer-${index1}`
          }
          className={
            item === correctAnswer
              ? 'correct'
              : 'incorrect'
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