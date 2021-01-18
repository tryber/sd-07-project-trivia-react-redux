import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { question, category } = this.props;

    return (
      <div className="questions">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.node.isRequired,
  category: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question.resQuestion,
  category: state.question.categoryRes,
});

export default connect(mapStateToProps)(Question);
