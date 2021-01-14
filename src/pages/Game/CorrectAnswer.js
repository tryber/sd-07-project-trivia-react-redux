import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScore } from '../../redux/actions';

class CorrectAnswer extends Component {
  render() {
    const { answer, isAnswered, timerValue, actionSetScore, difficulty } = this.props;
    return (
      <button
        type="button"
        data-testid="correct-answer"
        disabled={ isAnswered }
        className={ isAnswered ? 'answer-button-correct' : 'answer-button' }
        onClick={ () => actionSetScore(true, true, timerValue, difficulty) }
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  timerValue: state.throwTimer,
  isAnswered: state.questionAnswererd.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  // changeColor: (a, b) => dispatch(questionAnswered(a, b)),
  actionSetScore: (a, b, c, d) => dispatch(setScore(a, b, c, d)),
});

CorrectAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  actionSetScore: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  timerValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectAnswer);
