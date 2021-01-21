import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getQuestions } from '../Redux/actions';

import Question from './Question';
import Timer from './Timer';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      answered: false,
      time: 30,
    };

    this.onClickQuestion = this.onClickQuestion.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.setAnswered = this.setAnswered.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
  }

  componentDidMount() {
    const { token, getQuestionsDispatch } = this.props;
    getQuestionsDispatch(token);
  }

  onChangeTime(time) {
    this.setState({ time });
  }

  onClickQuestion({ difficulty }, event) {
    const { time } = this.state;

    // console.log(difficulty);

    this.setAnswered();
    // const { testid } = event.target.dataset;
    // const fourten = 14;
    // const answer = testid.substring(0, fourten);
    // if (answer.includes('wrong-answer')) {
    //   console.log('ERROU');
    // } else {
    //   console.log('ACERTOU');
    // }
  }

  onClickNext() {
    const { questions } = this.props;
    const { currentQuestion } = this.state;

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

  render() {
    const { questions } = this.props;
    const { currentQuestion, answered, time } = this.state;

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
