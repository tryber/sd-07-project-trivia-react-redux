import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends Component {
  constructor(props) {
    super(props);
    this.renderAlternatives = this.renderAlternatives.bind(this);
    this.handleClickCorrect = this.handleClickCorrect.bind(this);
    this.handleClickWrong = this.handleClickWrong.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);

    this.state = {
      numberQuestion: 0,
      alreadyAnswered: false,
      shuffle: true,
      timer: 30,
      assertions: 0,
      score: 0,
    };
  }

  componentDidMount() {
    const temp = 1000;
    setInterval(() => {
      this.setTimer();
    }, temp);
    const state = this.getPlayerProfile();
    const { score } = this.state;
    state.player.score = score;
    localStorage.setItem('state', JSON.stringify(state));
  }

  setTimer() {
    this.setState((prevState) => {
      if (prevState.timer > 0) {
        return ({
          timer: prevState.timer - 1,
        });
      }
    });
  }

  getPlayerProfile() {
    const { score, assertions } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score = score;
    state.player.assertions = assertions;
    return state;
  }

  handleClickCorrect() {
    const { timer, numberQuestion } = this.state;
    let currScore = 0;
    const { questions: { results } } = this.props;
    const { difficulty } = results[numberQuestion];

    const easy = 1;
    const medium = 2;
    const hard = 3;
    const dez = 10;

    switch (difficulty) {
    case 'easy':
      currScore = dez + (timer * easy);
      break;
    case 'medium':
      currScore = dez + (timer * medium);
      break;
    case 'hard':
      currScore = dez + (timer * hard);
      break;
    default:
      currScore = 0;
    }

    this.setState(({ score, assertions }) => ({
      alreadyAnswered: true,
      score: score + currScore,
      assertions: assertions + 1,
    }));

    // const { assertions } = this.state;
    const state = this.getPlayerProfile();
    state.player.score += currScore;
    state.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleClickWrong() {
    this.setState({
      alreadyAnswered: true,
    });
  }

  shuffle(a) {
    const { shuffle } = this.state;
    if (shuffle) {
      for (let i = a.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      this.setState({
        shuffle: false,
      });
    }
    return a;
  }

  handleClickNext() {
    const { numberQuestion } = this.state;
    const { history } = this.props;
    const um = 1;
    const quatro = 4;
    if (numberQuestion < quatro) {
      this.setState((prevState) => ({
        numberQuestion: prevState.numberQuestion + um,
        alreadyAnswered: false,
        timer: 30,
      }));
    } else {
      history.push('/feedback');
    }
  }

  renderNextBtn() {
    const { alreadyAnswered } = this.state;
    if (alreadyAnswered) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.handleClickNext() }
        >
          Próxima pergunta
        </button>
      );
    }
    return <div />;
  }

  renderAlternatives(correctAnswer, incorrectAnswers) {
    const { alreadyAnswered, timer } = this.state;
    const alternatives = [];
    alternatives.push(
      <button
        className={ alreadyAnswered ? 'green' : '' }
        type="button"
        data-testid="correct-answer"
        onClick={ () => this.handleClickCorrect() }
        disabled={ timer === 0 }
      >
        {correctAnswer}
      </button>,
    );
    incorrectAnswers.forEach((answer, index) => {
      alternatives.push(
        <button
          className={ alreadyAnswered ? 'red' : '' }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          onClick={ () => this.handleClickWrong() }
          disabled={ timer === 0 }
        >
          {answer}
        </button>,
      );
    });
    const alternativesSorted = this.shuffle(alternatives);
    return alternativesSorted;
  }

  render() {
    const { questions } = this.props;
    const { numberQuestion, timer } = this.state;
    return (
      <div>
        <Header playerProfile={ this.getPlayerProfile() } />
        <Trivia
          renderNextBtn={ this.renderNextBtn }
          numberQuestion={ numberQuestion }
          renderAlternatives={ this.renderAlternatives }
          questions={ questions }
          timer={ timer }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questions: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
