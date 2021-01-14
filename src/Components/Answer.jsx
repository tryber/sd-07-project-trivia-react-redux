import React from 'react';
import PropTypes from 'prop-types';

class Answer extends React.Component {
  render() {
    const { answer, status, index } = this.props;
    const data = status === 'correct' ? `${status}-answer` : `${status}-answer-${index}`;
    return (
      <button id={ answer } type="button" className="btn-actions" data-testid={ data }>
        { answer }
      </button>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Answer;
