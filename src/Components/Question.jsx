import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <div className="questions" data-testeid="question-text">
        { content }
      </div>);
  }
}

Question.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Question;
