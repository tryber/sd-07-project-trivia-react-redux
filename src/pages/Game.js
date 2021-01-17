import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
// https://www.npmjs.com/package/react-compound-timer
import { endTimeAction, resTimeAction } from '../actions';
import GridQuestions from '../components/GridQuestions';
import Header from '../components/Header';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.resetTimer = this.resetTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.timerResetButton = React.createRef();
    this.timerStartButton = React.createRef();
    this.timerStopButton = React.createRef();
  }

  componentDidUpdate() {
    const { timeReset, timeStop } = this.props;

    if (timeReset === true) {
      this.timerResetButton.current.click();
      this.timerStartButton.current.click();
    }

    if (timeStop === true) {
      this.timerStopButton.current.click();
    }
  }

  resetTimer(reset) {
    reset();
  }

  startTimer(start) {
    start();
  }

  stopTimer(stop, value) {
    const { timeValue } = this.props;
    stop();
    timeValue(value);
  }

  render() {
    const { endTime } = this.props;
    const moreTime = 5000;
    const mil = 1000;

    return (
      <div className="game">
        <div className="header">
          <Header />
        </div>
        <div className="gridQuestions">
          <GridQuestions />
        </div>
        <div className="timer">
          <Timer
            initialTime={ 30000 }
            direction="backward"
            checkpoints={ [
              {
                time: 0,
                callback: async () => setTimeout(await endTime(false), moreTime),
                reset: () => this.resetTimer(),
              },
            ] }
            onStop={ () => console.log('onStop') }
            onReset={ () => console.log('onReset') }
          >
            {({ start, stop, reset, getTime }) => (
              <div>
                <Timer.Seconds />
                <button
                  type="button"
                  hidden
                  ref={ this.timerResetButton }
                  onClick={ () => this.resetTimer(reset) }
                >
                  Reset
                </button>
                <button
                  type="button"
                  hidden
                  ref={ this.timerStartButton }
                  onClick={ () => this.startTimer(start) }
                >
                  Start
                </button>
                <button
                  type="button"
                  hidden
                  ref={ this.timerStopButton }
                  onClick={ () => this.stopTimer(stop, Math.round(getTime() / mil) - 1) }
                >
                  Stop
                </button>
              </div>
            )}
          </Timer>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  endTime: PropTypes.func.isRequired,
  timeReset: PropTypes.bool.isRequired,
  timeStop: PropTypes.bool.isRequired,
  timeValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timeReset: state.question.reset,
  timeStop: state.question.stop,
});

const mapDispatchToProps = (dispatch) => ({
  endTime: () => dispatch(endTimeAction()),
  timeValue: (value) => dispatch(resTimeAction(value)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
