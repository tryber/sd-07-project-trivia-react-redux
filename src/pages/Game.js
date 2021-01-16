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
    this.runTimer = this.runTimer.bind(this);
    this.answeredQuestion = this.answeredQuestion.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);

    this.state = {
      questionsArray: [],
      currentQuestion: 0,
      timer: 30,
      questionWasAnswered: false,
      score: 0,
      assertions: 0,
      shuffledAnswers: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    console.log('montou');
    this.fetchQuestions();
    this.runTimer();
  }

  handleScore() {
    let score = 0;
    const difficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const base = 10;
    const { questionsArray, currentQuestion, timer, assertions } = this.state;
    const answer = questionsArray[currentQuestion];

    switch (answer.difficulty) {
    case 'easy':
      score = base + (timer * difficulty.easy);
      break;
    case 'medium':
      score = base + (timer * difficulty.medium);
      break;
    case 'hard':
      score = base + (timer * difficulty.hard);
      break;
    default:
      score = 0;
    }
    this.setState({
      score,
      assertions: assertions + 1,
    });

    const player = { player: {
      name: localStorage.username,
      assertions: assertions + 1,
      score,
      gravatar: localStorage.email,
    },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  answeredQuestion(e) {
    const { name } = e.target;
    console.log('answered question');

    if (name === 'correct') {
      this.handleScore();
    }
    this.setState({ questionWasAnswered: true });
  }

  runTimer() {
    const seconds = 1000;
    this.myInterval = setInterval(() => {
      console.log();
      const { timer, questionWasAnswered } = this.state;
      console.log(`Timer: ${timer} question:${questionWasAnswered}`);
      if (timer > 0 && questionWasAnswered === false) this.setState({ timer: timer - 1 });
      if (timer === 0 || questionWasAnswered) {
        clearInterval(this.myInterval);
      }
    }, seconds);
  }

  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const myQuestions = await questionsRequest(token);
    this.setState({
      questionsArray: myQuestions,
      isLoading: true,
    });
    this.shuffleAnswers(myQuestions, 0);
  }

  nextQuestion() {
    const lastQuestion = 4;
    const { currentQuestion, questionsArray } = this.state;
    console.log('next-question-function');
    console.log(questionsArray);
    const { history } = this.props;
    if (currentQuestion === lastQuestion) {
      console.log('last question');
      history.push('/feedback');
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
        timer: 30,
        questionWasAnswered: false,
        isLoading: true,
      });
      this.shuffleAnswers(questionsArray, currentQuestion + 1);
      this.runTimer();
    }
  }

  shuffleAnswers(myQuestions, currentQuestion) {
    const question = myQuestions[currentQuestion];
    // const { question } = this.props;
    // define keys to new array
    console.log('shuffle');
    console.log(currentQuestion);
    console.log(question);
    const correctAnswer = question.correct_answer || null;
    const incorrectAnswer = question.incorrect_answers || null;
    const concatAnswersArr = [correctAnswer, ...incorrectAnswer] || null;
    // lint purpose - magic number
    const magic = 0.5;
    // sort concataned array to shuffle answers
    const sortedArr = concatAnswersArr.sort(() => Math.random() - magic);
    console.log('sorted');
    console.log(sortedArr);

    this.setState({
      // shuffled: true,
      shuffledAnswers: sortedArr,
      isLoading: false,
    });
  }

  render() {
    const {
      questionsArray,
      currentQuestion,
      timer,
      questionWasAnswered,
      score,
      shuffledAnswers,
      isLoading } = this.state;
    console.log('---render game---');
    console.log(shuffledAnswers);
    return (
      <div>
        <Header score={ score } />
        <h1>{timer}</h1>
        <h1>Token da requisição</h1>
        {localStorage.token}
        <Questions
          timer={ timer }
          question={ questionsArray[currentQuestion] }
          nextQuestion={ this.nextQuestion }
          answeredQuestionFunction={ this.answeredQuestion }
          questionWasAnswered={ questionWasAnswered }
          shuffledAnswers={ shuffledAnswers }
          isLoading={ isLoading }
        />
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
