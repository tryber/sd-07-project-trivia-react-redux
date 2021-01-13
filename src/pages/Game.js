import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import '../App.css';
import GameHeader from '../components/GameHeader';

class Game extends Component {
  constructor() {
    super();
    this.renderAllDataQuestion = this.renderAllDataQuestion.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.timer = this.timer.bind(this);
    this.shuffle = this.shuffle.bind(this);

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
    if (timer > 1) {
      setTimeout(() => {
        this.setState(({ timer }) => ({
          timer: timer -1,
        }))
      }, 1000);
    }
    if (timer === 0) {
      this.handleUserAnswer();
      this.setState({
        timer: 30,
        disableButton: true,
      });
    }
    if (timer === 25) {
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
      }
      button.classList.add('btnColorRed');
    });
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  renderAllDataQuestion() {
    // console.log()
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

      const arrayAnswers = [correctAnswer, ...wrongAnswer];
      return arrayAnswers;
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
        <p>{timer}</p>
      </div>
    ) : (
      <p>loading</p>
    );
  }
}

const mapStateToProps = ({ gameReducer }) => ({
  questions: gameReducer.questions,
  isFetching: gameReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(Object),
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
