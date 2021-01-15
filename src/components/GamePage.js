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
});

const mapDispatchToProps = (dispatch) => ({
  changeQuestion: () => dispatch(actions.changeQuestionNumber()),
  resetClasses: () => dispatch(actions.resetClasses()),
  disableOptions: () => dispatch(actions.disableOptions()),
  enableOptions: () => dispatch(actions.enableOptions()),
  inactivateButton: () => dispatch(actions.disableButton()),
  enableNextButton: () => dispatch(actions.enableButton()),
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
};
