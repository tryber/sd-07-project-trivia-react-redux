import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';
import actions from '../actions';
import Header from './Header';
import '../App.css';

class GamePage extends React.Component {
  constructor() {
    super();
    this.fetchGame = this.fetchGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.setScore = this.setScore.bind(this);
    this.state = {
      games: [],
      loading: true,
      timer: 30,
    };
  }

  componentDidMount() {
    const { token } = this.props;
    this.fetchGame(token);
    this.start();
    const player = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  handleClick() {
    const {
      changeQuestion,
      questionNumber,
      history,
      resetClasses,
      enableOptions,
      inactivateButton } = this.props;
    const maxQuestionNumber = 4;
    const { interval } = this.state;
    this.setScore();
    resetClasses();
    inactivateButton();
    if (questionNumber < maxQuestionNumber) {
      changeQuestion();
      this.setState({
        timer: 30,
      });
      this.stop(interval);
      this.start();
      enableOptions();
    } else {
      history.push('/feedback');
    }
  }

  setScore() {
    const {
      lastQuestionCorrect,
      updateScoreAction,
      score,
      assertions,
      questionNumber,
    } = this.props;
    if (lastQuestionCorrect) {
      const { games, timer } = this.state;
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
      storageState.player.assertions = assertions;
      localStorage.setItem('state', JSON.stringify(storageState));
      updateScoreAction(totalScore);
    }
  }

  start() {
    const oneSecond = 1000;
    const { disableOptions, enableNextButton } = this.props;
    const interval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState(({ timer: previous }) => ({
          timer: previous - 1,
        }));
      } else {
        this.stop(interval);
        enableNextButton();
        disableOptions();
      }
    }, oneSecond);
    this.setState(
      { interval },
    );
  }

  stop(interval) {
    clearInterval(interval);
  }

  async fetchGame(token) {
    try {
      const fetchAPI = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const gameInfo = await fetchAPI.json();
      this.setState({
        games: gameInfo.results,
        loading: false,
      });
    } catch (error) {
      return error;
    }
  }

  render() {
    const { games, loading } = this.state;
    const { questionNumber, nextButtonClass } = this.props;
    if (loading) {
      return <p>Loading...</p>;
    }
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = games[questionNumber];
    const { timer } = this.state;
    return (
      <div>
        <Header />
        <h2>{timer}</h2>
        <Question
          category={ category }
          question={ question }
          correctAnswer={ correctAnswer }
          incorrectAnswers={ incorrectAnswers }
          timer={ timer }
        />
        <button
          type="button"
          data-testid="btn-next"
          className={ nextButtonClass }
          onClick={ this.handleClick }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  questionNumber: state.gamepage.currentQuestion,
  nextButtonClass: state.gamepage.nextButtonClass,
  lastQuestionCorrect: state.gamepage.lastQuestionCorrect,
  score: state.gamepage.score,
  assertions: state.gamepage.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: () => dispatch(actions.changeQuestionNumber()),
  resetClasses: () => dispatch(actions.resetClasses()),
  disableOptions: () => dispatch(actions.disableOptions()),
  enableOptions: () => dispatch(actions.enableOptions()),
  inactivateButton: () => dispatch(actions.disableButton()),
  enableNextButton: () => dispatch(actions.enableButton()),
  updateScoreAction: (totalScore) => dispatch(actions.updateScore(totalScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);

GamePage.propTypes = {
  token: PropTypes.string.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  questionNumber: PropTypes.number.isRequired,
  resetClasses: PropTypes.func.isRequired,
  enableOptions: PropTypes.func.isRequired,
  disableOptions: PropTypes.func.isRequired,
  nextButtonClass: PropTypes.string.isRequired,
  inactivateButton: PropTypes.func.isRequired,
  enableNextButton: PropTypes.func.isRequired,
  updateScoreAction: PropTypes.func.isRequired,
  lastQuestionCorrect: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};
