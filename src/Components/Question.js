import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setStatePlayer } from '../actions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.clickCorrectAnswer = this.clickCorrectAnswer.bind(this);
  }

  clickCorrectAnswer() {
    const { timer, questions, currentQuestion, statePlayer } = this.props;
    const { player } = JSON.parse(localStorage.getItem('state'));
    player.assertions += 1;
    const points = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (questions[currentQuestion].difficulty) {
    case ('hard'):
      player.score += points + (timer * hard);
      break;
    case ('medium'):
      player.score += points + (timer * medium);
      break;
    default: player.score += points + (timer * easy);
    }
    localStorage.setItem('state', JSON.stringify({ player }));
    statePlayer({ player });
  }

  render() {
    const { questions, currentQuestion, answered, clickAnswered } = this.props;
    return (
      <div>
        <h1 data-testid="question-category">{questions[currentQuestion].category}</h1>
        <h1 data-testid="question-text">{questions[currentQuestion].question}</h1>
        <button
          type="button"
          data-testid="correct-answer"
          className={ answered ? 'correct-answer' : 'answered' }
          onClick={ () => {
            this.clickCorrectAnswer();
            clickAnswered();
          } }
          disabled={ answered }
        >
          {questions[currentQuestion].correct_answer}
        </button>
        {questions[currentQuestion].incorrect_answers.map((e, i) => {
          const datatestid = `wrong-answer-${i}`;
          return (
            <button
              key={ i }
              className={ answered ? 'incorrect-answer' : 'answered' }
              type="button"
              data-testid={ datatestid }
              onClick={ () => clickAnswered() }
              disabled={ answered }
            >
              {e}
            </button>);
        })}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  statePlayer: (statePlayer) => dispatch(setStatePlayer(statePlayer)),
});

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Question.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
      difficulty: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf,
    }).isRequired,
  ).isRequired,
  answered: PropTypes.bool.isRequired,
  clickAnswered: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  statePlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
