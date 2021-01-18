import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ listObjct, clicked, count, handleClick }) => (
  <>
    <span data-testid="question-category">{listObjct.category}</span>
    <h1 data-testid="question-text">{listObjct.question}</h1>
    <button
      type="button"
      data-testid="correct-answer"
      className={ clicked ? 'correct-answer-color' : '' }
      disabled={ clicked }
      id="correct"
      onClick={ (event) => handleClick(event) }
    >
      {listObjct.correct_answer}
    </button>
    {listObjct.incorrect_answers.map((incorrect, index) => (
      <button
        type="button"
        key={ incorrect }
        data-testid={ `wrong-answer-${index}` }
        className={ clicked ? 'wrong-answer-color' : '' }
        disabled={ clicked }
        id="incorrect"
        onClick={ (event) => handleClick(event) }
      >
        { incorrect }
      </button>
    ))}
    <p>{count}</p>
  </>
);

export default Question;

Question.propTypes = {
  listObjct: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  clicked: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
