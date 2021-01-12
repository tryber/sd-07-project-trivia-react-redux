import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CorrectAnswer extends Component {
  render() {
    const { answer } = this.props;
    return (
      <div>
        <button type="button" data-testid="correct-answer">
          { answer }
        </button>
      </div>
    );
  }
}

CorrectAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
};

export default CorrectAnswer;
