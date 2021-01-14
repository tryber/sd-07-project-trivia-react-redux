import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Answer.css';

class Answer extends Component {
  render() {
    const { item, click, changeColor } = this.props;
    const { answer, value } = item;
    const correctAnswer = -1;
    if (value !== correctAnswer) {
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${value}` }
          className={ `wrong-answer${click}` }
          onClick={ changeColor }
        >
          { answer }
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="correct-answer"
        className={ `correct-answer${click}` }
        onClick={ changeColor }
      >
        { answer }
      </button>
    );
  }
}

export default Answer;

Answer.propTypes = {
  item: propTypes.shape({
    answer: propTypes.string,
    value: propTypes.number,
  }),
}.isRequired;
