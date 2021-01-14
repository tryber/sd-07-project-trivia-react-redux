import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends Component {
  constructor(props) {
    super(props);
    this.renderAlternatives = this.renderAlternatives.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      numberQuestion: 0,
      alreadyAnswered: false,
      shuffle: true,
      timer: 30,
    };
  }

  componentDidMount() {
    const temp = 1000;
    setInterval(() => {
      this.setTimer();
    }, temp);
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
    return JSON.parse(localStorage.getItem('state'));
  }

  handleClick() {
    this.setState({
      alreadyAnswered: true,
    });
    /* console.log(target.innerText);
    const { questions } = this.props;
    const { results } = questions;
    if (results[this.state.numberQuestion].correct_answer === target.innerText) {
      target.className = 'green';
    }
    else {
      target.className = 'red';
    }

    const um = 1;
    this.setState((prevState) => {
      if (prevState.numberQuestion < questions.results.length - um) {
        return ({
          numberQuestion: prevState.numberQuestion + um,
        });
      }
    }); */
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

  renderAlternatives(correctAnswer, incorrectAnswers) {
    const { alreadyAnswered, timer } = this.state;
    const alternatives = [];
    alternatives.push(
      <button
        className={ alreadyAnswered ? 'green' : '' }
        type="button"
        data-testid="correct-answer"
        onClick={ () => this.handleClick() }
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
          onClick={ () => this.handleClick() }
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
  questions: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
