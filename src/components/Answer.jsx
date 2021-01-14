import React, { Component } from 'react';
import propTypes from 'prop-types';

class Answer extends Component {
  render() {
    const { item } = this.props;
    const { answer, value } = item;
    const correctAnswer = -1;
    if (value !== correctAnswer) {
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${value}` }
        >
          { answer }
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="correct-answer"
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
