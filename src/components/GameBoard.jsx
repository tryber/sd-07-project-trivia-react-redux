import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import getScore from '../helpers/getScore';
import { getQuestions } from '../Redux/actions';

import Question from './Question';
import Timer from './Timer';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      answered: false,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      time: 30,
    };

    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.setAnswered = this.setAnswered.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.setScore = this.setScore.bind(this);
    this.saveLocaStorageData = this.saveLocaStorageData.bind(this);
  }

  componentDidMount() {
    const { token, getQuestionsDispatch } = this.props;
    getQuestionsDispatch(token);
    this.saveLocaStorageData();
  }

  onChangeTime(time) {
    this.setState({ time });
  }

  onClickQuestion({ difficulty }, event) {
    const { time } = this.state;
    const { testid } = event.target.dataset;
    if (testid === 'correct-answer') {
      this.setState((state) => ({
        assertions: Number(state.assertions) + 1,
      }));
    }
    const score = getScore(difficulty, time, testid);
    this.setScore(score);
    this.setAnswered();
  }

  onClickNext() {
    const { questions } = this.props;
    const { currentQuestion } = this.state;
    if (currentQuestion === questions.length - 1) {
      this.setState({
        shouldRedirect: true,
      });
    }
    if (currentQuestion < questions.length - 1) {
      this.setState((state) => ({
        currentQuestion: state.currentQuestion + 1,
      }), () => {
        this.setState({ answered: false });
      });
    }
  }

  setAnswered() {
    this.setState({ answered: true });
  }

  setScore(score) {
    this.setState((state) => ({
      score: state.score + score,
    }), () => {
      const { name, assertions, score: toScore, gravatarEmail } = this.state;
      const player = { name, assertions, score: toScore, gravatarEmail };
      localStorage.setItem('state', JSON.stringify({ player }));
    });
  }

  saveLocaStorageData() {
    const { name, assertions, score: toScore, gravatarEmail } = this.state;
    const player = { name, assertions, score: toScore, gravatarEmail };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, answered, time, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }
    if (questions.length > 0) {
      return (
        <div>
          <Timer
            answered={ answered }
            setAnswered={ this.setAnswered }
            time={ time }
            onChangeTime={ this.onChangeTime }
          />
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
  gravatarEmail: state.userReducer.user.email,
  name: state.userReducer.user.username,
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsDispatch: (token) => dispatch(getQuestions(token)),
});

GameBoard.propTypes = {
  token: PropTypes.string.isRequired,
  getQuestionsDispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
