import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { changeColor, rightAnswer } from '../actions';
import './Answer.css';

class Answer extends Component {
  constructor() {
    super();

    this.clicked = this.clicked.bind(this);
    this.hit = this.hit.bind(this);
    this.setStorage = this.setStorage.bind(this);
  }

  setStorage(points) {
    const { playerInfo } = this.props;
    const { name, email, assertions, score } = playerInfo;
    const playerObject = { player: {
      name,
      assertions: assertions + 1,
      score: score + points,
      gravatarEmail: email,
    } };
    if (points === 0) playerObject.player.assertions = assertions + 0;
    localStorage.setItem('state', JSON.stringify(playerObject));
  }

  clicked() {
    const { changeClass } = this.props;
    changeClass();
    this.setStorage(0);
  }

  hit(question) {
    const { time, click, onHit } = this.props;
    const { difficulty } = question;
    if (click === '') {
      let difficultyPoints = 1;
      const medium = 2;
      const hard = 3;
      const baseValue = 10;
      if (difficulty === 'medium') difficultyPoints = medium;
      if (difficulty === 'hard') difficultyPoints = hard;
      const points = baseValue + (time * difficultyPoints);
      onHit(points);
      this.clicked();
      this.setStorage(points);
    }
  }

  render() {
    const { item, click, disable } = this.props;
    const { answer, value } = item;
    const correctAnswer = -1;
    if (value !== correctAnswer) {
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${value}` }
          className={ `wrong-answer${click}` }
          onClick={ this.clicked }
          disabled={ disable }
        >
          { answer }
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="correct-answer"
        className={ `correct-answer${click}` }
        onClick={ this.hit }
        disabled={ disable }
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  disable: state.timer.disable,
  click: state.questions.click,
  time: state.timer.time,
  playerInfo: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  changeClass: () => dispatch(changeColor()),
  onHit: (number) => dispatch(rightAnswer(number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);

Answer.propTypes = {
  item: propTypes.shape({
    answer: propTypes.string,
    value: propTypes.number,
  }),
}.isRequired;
