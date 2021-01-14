import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { question } = this.props;

    return (
      <div className="questions">
        { question }
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question.resQuestion,
});

export default connect(mapStateToProps)(Question);
