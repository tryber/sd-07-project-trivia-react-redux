import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions, getScore } from '../actions';
import '../App.css';
import GameHeader from '../components/GameHeader';

class Game extends Component {
  constructor() {
    super();
    this.renderAllDataQuestion = this.renderAllDataQuestion.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.timer = this.timer.bind(this);
    this.state = {
      questionIndex: 0,
      timer: 30,
      disableButton: true,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  componentDidUpdate() {
    this.timer();
  }

  timer() {
    const { timer } = this.state;
    const thousand = 1000;
    const twentyFive = 25;
    if (timer > 1) {
      setTimeout(() => {
        this.setState(({ timer }) => ({
          timer: timer - 1,
        }));
      }, thousand);
    }
    if (timer === 0) {
      this.handleUserAnswer();
      this.setState({
        timer: 30,
        disableButton: true,
      });
    }
    if (timer === twentyFive) {
      this.setState({
        timer: 24,
        disableButton: false,
      });
    }
  }

  handleUserAnswer() {
    document.querySelectorAll('button').forEach((button) => {
      const { id } = button;
      if (id === 'ok') {
        button.classList.add('btnColorGreen');
        this.calculateScore();
      }
      button.classList.add('btnColorRed');
    });
  }

  calculateScore() {
    const { questions, score, sendScore } = this.props;
    const { timer } = this.state;
    const questionLevel = questions.results[0].difficulty;
    let multiplier = 1;
    if (questionLevel === 'easy') multiplier = 1;
    if (questionLevel === 'medium') multiplier = 2;
    if (questionLevel === 'hard') multiplier = 3;
    const finalScore = score + (10 + timer * multiplier);
    sendScore(finalScore);
  }

  handleClick({ target }) {
    if (target.className === 'btnColorGreen') this.calculateScore();
  }

  renderAllDataQuestion() {
    const { questionIndex, disableButton } = this.state;
    const { questions } = this.props;

    if (questions.results) {
      const correctAnswer = (
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleUserAnswer }
          key="correct"
          id="ok"
          disabled={ disableButton }
        >
          { questions.results[questionIndex].correct_answer }
        </button>
      );
      const wrongAnswer = questions.results[questionIndex].incorrect_answers
        .map((answer, index) => (
          <button
            onClick={ this.handleUserAnswer }
            type="button"
            key={ answer }
            data-testid={ `wrong-answer-${index}` }
            id="notOk"
            disabled={ disableButton }
          >
            {answer}
          </button>
        ));
      return [correctAnswer, ...wrongAnswer];
    }
  }

  render() {
    const { questionIndex, timer } = this.state;
    const { questions } = this.props;
    return questions.results ? (
      <div>
        <GameHeader />
        <h1>TELA DE JOGO</h1>
        <h3 data-testid="question-category">
          {questions.results[questionIndex].category}
        </h3>
        <h2 data-testid="question-text">
          {questions.results[questionIndex].question}
        </h2>
        <div>{this.renderAllDataQuestion()}</div>
        <p>{ timer }</p>
      </div>
    ) : (
      <p>loading</p>
    );
  }
}

const mapStateToProps = ({ gameReducer, scoreReducer }) => ({
  questions: gameReducer.questions,
  isFetching: gameReducer.isFetching,
  score: scoreReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  sendScore: (score) => dispatch(getScore(score)),
});

Game.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(Object),
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
