import React from 'react';
import PropTypes from 'prop-types';
import { scrambler } from '../services';


const CustomGame = ({ challenge, correct }) => {
  const quiz = challenge[0];
  const { category, question, correct_answer, incorrect_answers } = quiz;
  const answersArray = scrambler([...incorrect_answers, correct_answer]);
  return (
    <div>

      <h1 data-testid="question-category">{category}</h1>
      <h3 data-testid="question-text">{question}</h3>
      {answersArray.map((item, index) => (
        <button
          type="button"
          key={ index }
          onClick={ correct }
          data-testid={
            item === correct_answer
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
