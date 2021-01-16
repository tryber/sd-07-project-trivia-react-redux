import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion, redirect, resetTimer, enableQuestions } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { changeQuestions, questions, toFeedback, reset, enable } = this.props;
    const filteredQuestions = questions.filter((item) => item !== questions[0]);
    if (filteredQuestions.length === 0) {
      return toFeedback('toFeedback');
    }
    changeQuestions(filteredQuestions);
    reset();
    enable();
  }

  render() {
    const { clicked, disable } = this.props;
    if (clicked || disable) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima pergunta
        </button>
      );
    }
    return null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeQuestions: (array) => dispatch(nextQuestion(array)),
  toFeedback: (string) => dispatch(redirect(string)),
  reset: () => dispatch(resetTimer()),
  enable: () => dispatch(enableQuestions()),
});

const mapStateToProps = (state) => ({
  clicked: state.questions.clicked,
  questions: state.questions.questions,
  disable: state.timer.disable,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  clicked: propTypes.bool,
}.isRequired;
