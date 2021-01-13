import React from 'react';
import PropTypes from 'prop-types';

const CustomGame = ({ challenge }) => (
  <div>
    {challenge.map(
      ({ category, question, correct_answer, incorrect_answers }) => {
        return (
          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{question}</p>
            <button data-testid="correct-answer">{correct_answer}</button>
            {incorrect_answers.map((item,index) => (
              <button key={ index } data-testid={`wrong-answer-${index}`}>{item}</button>
            ))}
          </div>
        );
      }
    )}
  </div>
);

CustomGame.propTypes = {
  challenge: PropTypes.shape(PropTypes.array).isRequired,
};

export default CustomGame;
