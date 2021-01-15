import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';
import actions from '../actions';
import Header from './Header';
import '../App.css';
import { saveTimer } from '../actions/gamepage';

class GamePage extends React.Component {
  constructor() {
    super();
    this.fetchGame = this.fetchGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.setRanking = this.setRanking.bind(this);
    this.state = {
      games: [],
      loading: true,
      timer: 30,
    };
  }

  componentDidMount() {
    const { token, name, email } = this.props;
    this.fetchGame(token);
    this.start();
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  componentWillUnmount() {
    const { interval } = this.state;
    this.stop(interval);
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
    const { interval, timer } = this.state;
    resetClasses();
    inactivateButton();
    if (questionNumber < maxQuestionNumber) {
      saveTimer(timer);
      changeQuestion();
      this.setState({
        timer: 30,
      });
      this.stop(interval);
      this.start();
      enableOptions();
    } else {
      this.setRanking();
      history.push('/feedback');
    }
  }

  setRanking() {
    const { name, score, gravatarProps } = this.props;
    if (localStorage.getItem('ranking')) {
      const arrayRanking = JSON.parse(localStorage.getItem('ranking'));
      arrayRanking.push({ name, score, picture: gravatarProps });
      localStorage.setItem('ranking', JSON.stringify(arrayRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([{
        name,
        score,
        picture: gravatarProps,
      }]));
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
          games={ games }
          questionNumber={ questionNumber }
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
  score: state.gamepage.score,
  name: state.login.name,
  email: state.login.email,
  gravatarProps: state.gamepage.gravatar,
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: () => dispatch(actions.changeQuestionNumber()),
  resetClasses: () => dispatch(actions.resetClasses()),
  disableOptions: () => dispatch(actions.disableOptions()),
  enableOptions: () => dispatch(actions.enableOptions()),
  inactivateButton: () => dispatch(actions.disableButton()),
  enableNextButton: () => dispatch(actions.enableButton()),
  saveTimer: (timer) => dispatch(actions.saveTimer(timer)),
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
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gravatarProps: PropTypes.string.isRequired,
};
