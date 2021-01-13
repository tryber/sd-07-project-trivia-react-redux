import React from 'react';
import PropTypes from 'prop-types';

const CustomGame = ({ challenge ,correct}) => (
  <div>
    {challenge.map(
      ({ category, question, correct_answer, incorrect_answers }, index ) => {
        return (
          <div key={index}>
            <p data-testid="question-category">{ category }</p>
            <p data-testid="question-text">{ question }</p>
            <button key={correct_answer} data-testid="correct-answer" onClick={ correct } >{ correct_answer }</button>
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
