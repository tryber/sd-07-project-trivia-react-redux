import React, { Component } from 'react';
import PropTypes from 'prop-types';
import questionsRequest from '../services/QuestionsRequest';
import Header from '../components/Header';
import Questions from './Questions';

class Game extends Component {
  constructor() {
    super();
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);

    this.state = {
      questionsArray: [],
      currentQuestion: 0,
      timer: 30,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  startTimer() {
    const seconds = 1000;
    setInterval(this.handleTimer, seconds);
  }

  stopTimer() {
    clearInterval(this.handleTimer);
  }

  handleTimer() {
    const { timer } = this.state;
    if (timer === 0) {
      return this.stopTimer();
    }
    this.setState({ timer: timer - 1 });

    console.log('será q parou?');
  }

  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const myQuestions = await questionsRequest(token);
    this.setState({
      questionsArray: myQuestions,
    });
  }

  nextQuestion() {
    const { currentQuestion } = this.state;
    const { history } = this.props;
    const numberQuestion = 4;
    if (currentQuestion < numberQuestion) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        timer: 30,
      });
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { questionsArray, currentQuestion, timer } = this.state;
    console.log('questionsArray', questionsArray);
    return (
      <div>
        <Header />
        <h1>{timer}</h1>
        <h1>Token da requisição</h1>
        {localStorage.token}
        {questionsArray[currentQuestion]
          && <Questions
            timer={ timer }
            question={ questionsArray[currentQuestion] }
            nextQuestion={ this.nextQuestion }
          />}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
