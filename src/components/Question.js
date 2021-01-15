import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import '../App.css';

class Question extends React.Component {
  constructor() {
    super();
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this);
  }

  handleCorrectAnswer() {
    const {
      changeButtonStyle,
      activateButton,
      updateScoreAction,
      score,
      assertions,
      questionNumber,
      games,
      timer,
    } = this.props;
    const {
      question,
    } = games[questionNumber];
    const hard = 3;
    const medium = 2;
    let points = 0;
    if (question.difficulty === 'hard') {
      points = hard;
    } else if (question.difficulty === 'medium') {
      points = medium;
    } else {
      points = 1;
    }
    const tenPoints = 10;
    const totalScore = tenPoints + (timer * points) + score;
    const storageState = JSON.parse(localStorage.getItem('state'));
    storageState.player.score = totalScore;
    storageState.player.assertions = assertions + 1;
    localStorage.setItem('state', JSON.stringify(storageState));
    updateScoreAction(totalScore);
    changeButtonStyle();
    activateButton();
  }

  handleIncorrectAnswer() {
    const { changeButtonStyle, activateButton } = this.props;
    changeButtonStyle();
    activateButton();
  }

  render() {
    const { rightClass, wrongClass, optionsDisabled } = this.props;
    const {
      category,
      question,
      correctAnswer,
      incorrectAnswers,
    } = this.props;
    const index = 0;
    return (
      <div>
        <p key={ `question${index}` } data-testid="question-category">{category}</p>
        <p key={ `category${index}` } data-testid="question-text">{question}</p>
        <button
          type="button"
          key={ `right${index}` }
          className={ rightClass }
          disabled={ optionsDisabled }
          data-testid="correct-answer"
          onClick={ this.handleCorrectAnswer }
        >
          {correctAnswer}
        </button>
        {incorrectAnswers.map((answer, order) => (
          <button
            type="button"
            key={ `wrong${order}` }
            className={ wrongClass }
            disabled={ optionsDisabled }
            data-testid={ `wrong-answer-${order}` }
            onClick={ this.handleIncorrectAnswer }
          >
            {answer}
          </button>))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  rightClass: state.gamepage.rightClass,
  wrongClass: state.gamepage.wrongClass,
  timer: state.gamepage.timer,
  optionsDisabled: state.gamepage.optionsDisabled,
  score: state.gamepage.score,
  assertions: state.gamepage.assertions,
});
const mapDispatchToProps = (dispatch) => ({
  changeButtonStyle: () => dispatch(actions.changeButtonStyle()),
  activateButton: () => dispatch(actions.enableButton()),
  updateScoreAction: (totalScore) => dispatch(actions.updateScore(totalScore)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Question);
Question.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.shape(PropTypes
    .arrayOf(PropTypes.shape(PropTypes.string))).isRequired,
  changeButtonStyle: PropTypes.func.isRequired,
  rightClass: PropTypes.string.isRequired,
  wrongClass: PropTypes.string.isRequired,
  optionsDisabled: PropTypes.bool.isRequired,
  activateButton: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  updateScoreAction: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired,
  //  proptypes aleatória
  games: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};
