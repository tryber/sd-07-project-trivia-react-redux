import React from 'react';
import PropTypes from 'prop-types';

const CustomGame = ({ challenge }) => (
  <div>
    {challenge.map(
      ({ category, question, correct_answer, incorrect_answers }) => {
        return (
          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-category">{question}</p>
            <p data-testid="question-category">{correct_answer}</p>
            {incorrect_answers.map((item) => (
              <p data-testid="question-category">{item}</p>
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
