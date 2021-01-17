import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.randomChoice = this.randomChoice.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.calcDifficultyPoints = this.calcDifficultyPoints.bind(this);
    this.WinnerOrLoser = this.WinnerOrLoser.bind(this);
    this.state = {
      green: '',
      red: '',
      timer: '',
      disabled: false,
      shuffledAnswers: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    const { results } = questions;
    if (prevProps.questions.results !== results) {
      this.randomChoice(results);
      this.startCountDown();
    }
  }

  WinnerOrLoser() {
    const { history } = this.props;
    history.push('/feedback');
  }

  randomChoice(results) {
    const newResults = results.map((result) => {
      const categoryAndQuestion = {
        category: result.category,
        question: result.question,
        difficulty: result.difficulty,
      };
      const shuffledAnswers = [
        ...result.incorrect_answers.map((incorrect) => (
          {
            text: incorrect,
            correct: false,
          }
        )),
        {
          text: result.correct_answer,
          correct: true,
        }];
      // Durstenfeld shuffle algorithm
      for (let i = shuffledAnswers.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const aux = shuffledAnswers[i];
        shuffledAnswers[i] = shuffledAnswers[j];
        shuffledAnswers[j] = aux;
      }
      const objectToBeReturned = {
        answers: shuffledAnswers,
        ...categoryAndQuestion,
      };
      return objectToBeReturned;
    });
    this.setState({
      shuffledAnswers: newResults,
    });
  }

  startCountDown() {
    const milliseconds = 30000;
    const convertNumber = 1000;
    const minuteSeconds = 60;
    const updateTime = 1000;
    const countDownSeconds = new Date().getTime() + milliseconds;
    const startSeconds = (countDownSeconds - new Date().getTime()) / convertNumber;
    this.setState({
      timer: startSeconds,
    });
    const updateTimerWithOneSecond = setInterval(() => {
      const now = new Date().getTime();
      const gap = countDownSeconds - now;
      const seconds = Math.ceil((gap % (convertNumber * minuteSeconds)) / convertNumber);
      this.setState({
        timer: seconds,
        green: '',
        red: '',
      });

      if (gap <= 0) {
        clearInterval(updateTimerWithOneSecond);
        this.setState({
          timer: 'Tempo expirado',
        });
        this.stopButtons();
      }
    }, updateTime);
  }

  stopButtons() {
    const { disableButton } = this.props;
    disableButton();
    this.setState({
      disabled: true,
    });
  }

  handleClick(event) {
    const { disableButton, next } = this.props;
    const maxQuestion = 4;
    this.setState({
      green: 'green',
      red: 'red',
    });
    if (next !== maxQuestion) {
      disableButton();
    } else {
      this.WinnerOrLoser();
    }
    this.saveScore(event);
  }

  saveScore({ target }) {
    const { timer } = this.state;
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const getTestId = target.getAttribute('data-testid');
    const getDifficulty = target.getAttribute('data-difficulty');
    const { player: { name, email } } = getLocalStorage;
    let { player: { assertions, score } } = getLocalStorage;
    if (getTestId === 'correct-answer') {
      const standardCalcNumber = 10;
      const getDifficultyPoints = this.calcDifficultyPoints(getDifficulty);
      const calculation = standardCalcNumber + (timer * getDifficultyPoints);
      assertions += 1;
      score += calculation;
      const newPlayer = { player: { name, assertions, score, email } };
      localStorage.setItem('state', JSON.stringify(newPlayer));
    }
  }

  calcDifficultyPoints(getDifficulty) {
    const noPoint = 0;
    const easyPoint = 1;
    const mediumPoint = 2;
    const hardPoint = 3;
    switch (getDifficulty) {
    case 'easy':
      return easyPoint;
    case 'medium':
      return mediumPoint;
    case 'hard':
      return hardPoint;
    default:
      return noPoint;
    }
  }

  render() {
    const { timer, shuffledAnswers, green, red, disabled } = this.state;
    const { next } = this.props;

    if (shuffledAnswers) {
      return (
        <div>
          <div>{timer}</div>
          <label htmlFor="div">
            Categoria:
            <div data-testid="question-category">
              {shuffledAnswers[next].category}
            </div>
          </label>
          <label htmlFor="div">
            Pergunta:
            <div data-testid="question-text">
              {shuffledAnswers[next].question}
            </div>
          </label>
          <div>
            {shuffledAnswers[next].answers.map((answer, index) => {
              if (answer.correct === true) {
                return (
                  <button
                    type="button"
                    key={ index }
                    className={ green }
                    data-testid="correct-answer"
                    data-difficulty={ shuffledAnswers[next].difficulty }
                    disabled={ disabled }
                    onClick={ (event) => this.handleClick(event) }
                  >
                    { answer.text}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  key={ index }
                  className={ red }
                  data-testid={ `wrong-answer-${index}` }
                  data-difficulty={ shuffledAnswers[next].difficulty }
                  disabled={ disabled }
                  onClick={ (event) => this.handleClick(event) }
                >
                  {answer.text}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    return <p>Loading... </p>;
  }
}

Questions.propTypes = {
  questions: PropTypes.objectOf.isRequired,
  disableButton: PropTypes.func.isRequired,
  next: PropTypes.number.isRequired,
  history: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.receiveQuestions.questions,
});

export default connect(mapStateToProps, null)(Questions);
