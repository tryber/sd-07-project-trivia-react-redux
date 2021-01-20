import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getQuestions, resetTimerAction } from '../Redux/actions';

import Question from './Question';
import Timer from './Timer';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      answered: false,
    };

    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  componentDidMount() {
    const { token, getQuestionsDispatch } = this.props;
    getQuestionsDispatch(token);
  }

  onClickQuestion() {
    this.setState({
      answered: true,
    });
  }

  onClickNext() {
    const { questions, resetCount } = this.props;
    const { currentQuestion } = this.state;
    if (currentQuestion < questions.length - 1) {
      this.setState((state) => ({
        currentQuestion: state.currentQuestion + 1,
      }), () => this.setState({ answered: false }));
    }
    resetCount(true);
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, answered } = this.state;

    if (questions.length > 0) {
      return (
        <div>
          <Timer />
          <Question
            currentQuestion={ questions[currentQuestion] }
            onClickNext={ this.onClickNext }
            onClickQuestion={ this.onClickQuestion }
            answered={ answered }
          />
        </div>
      );
    }

    return <p>Carregando...</p>;
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.user.token,
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsDispatch: (token) => dispatch(getQuestions(token)),
  resetCount: (bool) => dispatch(resetTimerAction(bool)),
});

GameBoard.propTypes = {
  token: PropTypes.string.isRequired,
  getQuestionsDispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
