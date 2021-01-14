import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './questionList.css';
import GameTimer from '../GameTimer';

class QuestionsList extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      score: 0,
      assertions: 0,
    };
    this.whatData = 0;
    this.timerZero = this.timerZero.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setLocalData(score, assertions) {
    const playerObject = {
      player: { score, assertions },
    };
    localStorage.setItem('state', JSON.stringify(playerObject));
    this.setState({ score, assertions });
  }

  calculateScore() {
    const { reduxTime, list } = this.props;
    const { score, assertions } = this.state;
    if (reduxTime) {
      const { difficulty } = list[0];
      const baseScore = 10;
      const multiplierPerDifficulty = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const newScore = score + baseScore + (reduxTime * multiplierPerDifficulty[
        difficulty]);
      const newAssertions = assertions + 1;
      clearInterval(this.whatData);
      return this.setLocalData(newScore, newAssertions);
    }
    this.whatData = setInterval(this.calculateScore, 100);
  }

  timerZero() {
    this.setState({
      clicked: true,
    });
  }

  handleClick(e) {
    const { id } = e.target;
    this.setState({
      clicked: true,
    }, () => {
      if (id === 'correct') this.calculateScore();
    });
  }

  render() {
    const { list } = this.props;
    const { clicked } = this.state;
    const { timerZero, handleClick } = this;
    if (!list[0]) return <h1>...Carregando</h1>;
    return (
      <div>
        <span data-testid="question-category">{list[0].category}</span>
        <h1 data-testid="question-text">{list[0].question}</h1>
        <button
          type="button"
          data-testid="correct-answer"
          className={ clicked ? 'correct-answer-color' : '' }
          disabled={ clicked }
          id="correct"
          onClick={ (event) => handleClick(event) }
        >
          {list[0].correct_answer}
        </button>
        {list[0].incorrect_answers.map((incorrect, index) => (
          <button
            type="button"
            key={ incorrect }
            data-testid={ `wrong-answer-${index}` }
            className={ clicked ? 'wrong-answer-color' : '' }
            disabled={ clicked }
            id="incorrect"
            onClick={ (event) => handleClick(event) }
          >
            { incorrect }
          </button>
        ))}
        <GameTimer timerZero={ timerZero } clicked={ clicked } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.game.QuestionsList,
  reduxTime: state.game.time,
});

QuestionsList.propTypes = {
  list: PropTypes.shape(PropTypes.array).isRequired,
  reduxTime: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(QuestionsList);
