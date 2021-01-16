import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
// https://www.npmjs.com/package/react-compound-timer
import { endTimeAction } from '../actions';
import GridQuestions from '../components/GridQuestions';
import Header from '../components/Header';
import './Game.css';

class Game extends Component {
  render() {
    const { endTime, timeReset, timeStop } = this.props;
    const moreTime = 5000;
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
                callback: () => setTimeout(endTime(false), moreTime),
              },
            ] }
            onStop={ () => console.log('onStop hook') }
            onReset={ () => console.log('onReset hook') }
          >
            { ({ stop, reset }) => (
              <React.Fragment>
                <div>
                  <Timer.Seconds />
                </div>
                  { timeStop ? stop : timeStop }
                  { timeReset ? reset : timeReset }
              </React.Fragment>
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
};

const mapStateToProps = (state) => ({
  timeReset: state.question.reset,
  timeStop: state.question.stop,
});

const mapDispatchToProps = (dispatch) => ({
  endTime: () => dispatch(endTimeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
