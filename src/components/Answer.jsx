import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { changeColor, changeScore } from '../actions';
import './Answer.css';
import * as callAPI from '../services/callAPI';

class Answer extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    }
    this.clicked = this.clicked.bind(this);
    this.scoreCalculate = this.scoreCalculate.bind(this);
  }



  scoreCalculate() {
    const { question, setScore } = this.props;
    const scoreStorege = localStorage.getItem('playerScore');

    if (question.results[0].difficulty === 'easy') {
      const difficultyNum = 1;
      const pointForHit = 10;
      const timer = this.state.time;
      const newScore = parseInt(scoreStorege, 10) + pointForHit + (timer * difficultyNum);
      setScore(newScore);

       localStorage.setItem('playerScore', newScore);
    }
  }
  

  clicked() {
    const { changeClass } = this.props;
    changeClass();
  }

  render() {
    const { item, click, disable, score } = this.props;
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
        onClick={ () =>{ this.clicked(); this.scoreCalculate(score) }}
        disabled={ disable }
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  score: state.player.score,
  disable: state.timer.disable,
  click: state.color.click,
});

const mapDispatchToProps = (dispatch) => ({
  changeClass: () => dispatch(changeColor()),
  setScore: (score) => dispatch(changeScore(score))});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);

Answer.propTypes = {
  item: propTypes.shape({
    answer: propTypes.string,
    value: propTypes.number,
  }),
}.isRequired;
