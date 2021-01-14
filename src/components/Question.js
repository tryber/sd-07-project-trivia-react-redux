import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { questions } = this.props;

    return (
      <div className="questions">
        { questions }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.resQuestion });

export default connect(mapStateToProps)(Question);
