import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correclyAnswerSum, freezeTimeAction } from '../redux/actions';

class RandomAnswer extends Component {
  constructor() {
    super();

    this.state = {
      answersRandom: [],
    };
    this.saveScoreLocalStorage = this.saveScoreLocalStorage.bind(this);
    this.handleSumCorreclyAnswer = this.handleSumCorreclyAnswer.bind(this);
    this.randomArrayQuestions = this.randomArrayQuestions.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.showNextQuestionBtn = this.showNextQuestionBtn.bind(this);
    this.disableBtns = this.disableBtns.bind(this);
  }

  componentDidMount() {
    const { currentQuestion } = this.props;
    this.randomArrayQuestions(currentQuestion
      .correct_answer, currentQuestion.incorrect_answers);
  }

  disableBtns() {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    correctAnswer.disabled = 'true';
    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].disabled = 'true';
    }
    const nextQuestionBtn = document.querySelector('.next-question');
    nextQuestionBtn.style.display = 'block';
  }

  randomArrayQuestions(string, array) {
    const newArray = [...array, string];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    this.setState({ answersRandom: newArray });
  }

  saveScoreLocalStorage() {
    const { score, name, gravatarEmail, assertions } = this.props;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleSumCorreclyAnswer({ target }) {
    const { timer, currentQuestion, sumScore } = this.props;
    let difficulty = 0;
    const difficultyNumber1 = 1;
    const difficultyNumber2 = 2;
    const difficultyNumber3 = 3;
    const tenPointForCorrectAnswer = 10;
    if (currentQuestion.difficulty === 'easy') difficulty = difficultyNumber1;
    if (currentQuestion.difficulty === 'medium') difficulty = difficultyNumber2;
    if (currentQuestion.difficulty === 'hard') difficulty = difficultyNumber3;

    if (target.classList.contains('correct-answer')) {
      sumScore(tenPointForCorrectAnswer, timer, difficulty);
    }
  }

  changeBorderColor(e) {
    const btnClicked = e.target;
    const correctAnswer = document.querySelector('.correct-answer');
    const wrongAnswers = document.querySelectorAll('.wrong-answer');

    btnClicked.style.backgroundColor = '#FFDEAD';
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';

    for (let index = 0; index < wrongAnswers.length; index += 1) {
      wrongAnswers[index].style.border = '3px solid rgb(255, 0, 0)';
    }
  }

  showNextQuestionBtn() {
    const nextQuestionBtn = document.querySelector('.next-question');
    nextQuestionBtn.style.display = 'block';
  }

  render() {
    const { currentQuestion, freezeTime, setIntervalState } = this.props;
    const { answersRandom } = this.state;
    return (
      <div>
        { answersRandom
          .map((element, indice) => (
            <button
              key={ indice }
              type="button"
              data-testid={ element === currentQuestion.correct_answer
                ? 'correct-answer' : `wrong-answer-${indice}` }
              className={ element === currentQuestion.correct_answer
                ? 'correct-answer'
                : 'wrong-answer' }
              onClick={ (e) => {
                this.handleSumCorreclyAnswer(e);
                this.disableBtns();
                this.changeBorderColor(e);
                this.showNextQuestionBtn();
                clearInterval(setIntervalState);
                freezeTime();
              } }
            >
              { element}
            </button>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  setIntervalState: state.play.setIntervalState,
  questions: state.play.questions,
  currentQuestion: state.play.currentQuestion,
  timer: state.play.timer,
  score: state.login.score,
  name: state.login.name,
  assertions: state.login.assertions,
  gravatarEmail: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  sumScore: (tenPointForCorrectAnswer, timer, difficulty) => {
    dispatch(correclyAnswerSum(tenPointForCorrectAnswer, timer, difficulty));
  },
  freezeTime: () => dispatch(freezeTimeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RandomAnswer);

RandomAnswer.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  sumScore: PropTypes.func.isRequired,
  freezeTime: PropTypes.func.isRequired,
  setIntervalState: PropTypes.number.isRequired,
  currentQuestion: PropTypes.shape({
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    difficulty: PropTypes.number.isRequired,
  }).isRequired,
};
