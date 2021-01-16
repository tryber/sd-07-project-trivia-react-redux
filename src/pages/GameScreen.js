import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomHeader, CustomGame, CustomNextButton, CustomTimer } from '../components';
import {
  getStorage, countdown, setStorage, stopTimer, getScore, checkDuplicatesInStorage,
} from '../services';
import { fetchTrivia, updateGameDates } from '../actions';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      count: 0,
      time: 30,
      timeout: false,
    };
    this.updateStorage = this.updateStorage.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.timerInit = this.timerInit.bind(this);
  }

  componentDidMount() {
    const { dispatchTrivia } = this.props;
    dispatchTrivia(getStorage('token'));
  }

  componentDidUpdate() {
    this.checkTimer();
  }

  checkTimer() {
    const { time } = this.state;
    if (time === 0) {
      this.submitAnswer({ target: { id: '' } });
    }
  }

  timerInit() {
    clearInterval(this.timer);
    this.timer = countdown((stop) => {
      this.setState(({ time }) => (
        time
          ? { time: time - 1 }
          : stop(this.timer)
      ));
    });
  }

  updateStorage() {
    const { name, score, gravatarEmail, assertions } = this.props;
    const userRanking = { name, score, gravatarEmail };
    const newLocalStorage = checkDuplicatesInStorage(userRanking);
    setStorage('ranking', newLocalStorage);
    const newPlayer = { player: { name, score, assertions, gravatarEmail } };
    setStorage('state', newPlayer);
  }

  submitAnswer({ target: { id } }) {
    if (id.length) {
      const { time } = this.state;
      const { dispatchScores } = this.props;
      const score = getScore(id, time);
      dispatchScores(score, this.updateStorage);
    }
    this.setState({ answered: true, timeout: true, time: 30 }, stopTimer(this.timer));
  }

  changeCount() {
    const { count } = this.state;
    const { history } = this.props;
    const four = 4;
    this.timerInit();
    if (count >= four) history.push('/feedback');
    else this.setState({ count: count + 1, answered: false, timeout: false });
  }

  render() {
    const { name, trivia, loading, email } = this.props;
    const { answered, count, time, timeout } = this.state;
    return (
      <div
        className="margin-page"
      >
        <CustomHeader name={ name } email={ email } />
        {loading && <p>...Loading</p>}

        {trivia.length > 0 && (
          <div>
            <CustomGame
              changeStyle={ answered }
              index={ count }
              challenge={ trivia }
              correct={ this.submitAnswer }
              timeout={ timeout }
            />
            <CustomTimer time={ time } timerInit={ this.timerInit } />
          </div>
        )}
        {answered && <CustomNextButton next={ this.changeCount } />}
      </div>
    );
  }
}
const mapStateToProps = ({
  loginReducer: { name, email },
  triviaReducer: { trivia, loading },
  tokenReducer: { loadingToken },
  playerReducer: { score, assertions, gravatarEmail },
}) => ({
  name,
  email,
  trivia,
  assertions,
  gravatarEmail,
  score,
  loading,
  loadingToken,

});
const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (a) => dispatch(fetchTrivia(a)),
  dispatchScores: (scores, callback) => dispatch(updateGameDates(scores, callback)),
});

GameScreen.propTypes = {
  dispatchTrivia: PropTypes.func.isRequired,
  dispatchScores: PropTypes.func.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
