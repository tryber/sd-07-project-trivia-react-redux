import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { content } = this.props;
    return (
      <div className="questions" data-testeid="question-text">
        <p data-testeid="question-text">{ content }</p>
      </div>);
  }
}

Question.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Question;
