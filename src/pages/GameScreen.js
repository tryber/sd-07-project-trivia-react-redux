import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomHeader, CustomGame, CustomNextButton, CustomTimer } from '../components';
import { getStorage, countdown } from '../services';
import { fetchTrivia } from '../actions';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      count: 0,
      time: 30,
      assertions: 0,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.timerInit = this.timerInit.bind(this);
  }

  componentDidMount() {
    const { dispatchTrivia } = this.props;
    dispatchTrivia(getStorage('token'));
  }

  submitAnswer({ target: { 'data-testid': response } }) {
    if (response === 'correct-answer') {
      this.setState(({ assertions }) => ({ assertions: assertions + 1 }));
    }
    // this.changeSstyles();
    this.setState({ answered: true });
  }

  timerInit() {
    this.setState({ time: 30 });
    clearInterval(this.timer);
    this.timer = countdown((stop) => {
      this.setState(({ time }) => (
        time
          ? { time: time - 1 }
          : stop(this.timer)
      ));
    });
  }

  userDates() {
    // const { name, assertions, score, gravatarEmail } = this.props;
    // setStorage('player', { name, assertions, score, gravatarEmail });
  }

  changeCount() {
    const { count } = this.state;
    this.setState({ count: count + 1, answered: false });
  }

  render() {
    const { name, email, trivia, loading } = this.props;
    const { answered, count, time } = this.state;
    return (
      <div>
        <CustomHeader name={ name } email={ email } />
        {
          loading && trivia.length === 0
            ? (<p>...Loading</p>)
            : (
              <div>
                <CustomGame
                  changeStyle={ answered }
                  index={ count }
                  challenge={ trivia }
                  correct={ this.submitAnswer }
                  timerInit={ this.timerInit }
                />
                <CustomTimer time={ time } timerInit={ this.timerInit } />
                {answered && <CustomNextButton next={ this.changeCount } />}
              </div>
            )
        }
      </div>
    );
  }
}
const mapStateToProps = ({
  loginReducer: { name, email },
  triviaReducer: { trivia, loading },
  tokenReducer: { loadingToken },
}) => ({
  name,
  email,
  trivia,
  loading,
  loadingToken,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (a) => dispatch(fetchTrivia(a)),
});

GameScreen.propTypes = {
  dispatchTrivia: PropTypes.func.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
