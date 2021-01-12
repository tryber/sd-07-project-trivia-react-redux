import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WrongAnswer extends Component {
  render() {
    const { answer, index } = this.props;
    const label = `wrong-answer-${index}`;
    return (
      <div>
        <button type="button" data-testid={ label }>
          { answer }
        </button>
      </div>
    );
  }
}

WrongAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default WrongAnswer;
