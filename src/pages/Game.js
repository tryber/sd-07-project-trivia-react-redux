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
    this.renderTime = this.renderTime.bind(this);
    this.shuffle = this.shuffle.bind(this);

    this.state = {
      questionIndex: 0,
      timer: 30,
      disableButton: true,
      shuffle: true,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
    this.renderTime();
  }

  componentDidUpdate() {
    this.timer();
  }

  timer() {
    const { timer } = this.state;
    const initialSecondEnableButton = 25;
    const lastSecondDisableButton = 0;
    if (timer === lastSecondDisableButton) {
      this.handleUserAnswer();
      this.setState({
        timer: 30,
        disableButton: true,
      });
    }
    if (timer === initialSecondEnableButton) {
      this.setState((prevState) => ({
        ...prevState,
        timer: 24,
        disableButton: false,
      }));
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
    // let currentIndex = array.length, temporaryValue, randomIndex;
    // // While there remain elements to shuffle...
    // while (currentIndex !== 0) {
    //   // Pick a remaining element...
    //   randomIndex = Math.floor(Math.random() * currentIndex);
    //   currentIndex -= 1;
    //   // And swap it with the current element.
    //   temporaryValue = array[currentIndex];
    //   array[currentIndex] = array[randomIndex];
    //   array[randomIndex] = temporaryValue;
    // }
    return array;
  }

  renderTime() {
    const secondTimerFunction = 1000;
    const lastSecondDisableButton = 0;
    const { timer } = this.state;
    setInterval(() => {
      if (timer > lastSecondDisableButton) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, secondTimerFunction);
  }

  renderAllDataQuestion() {
    // console.log()
    const { questionIndex, disableButton } = this.state;
    const { questions } = this.props;
    console.log(questions);

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

      const arrayAnswers = [...wrongAnswer, correctAnswer];
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
