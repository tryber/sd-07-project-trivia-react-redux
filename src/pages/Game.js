import React, { Component } from 'react';
import Timer from 'react-compound-timer';
// https://www.npmjs.com/package/react-compound-timer
import GridQuestions from '../components/GridQuestions';
import Header from '../components/Header';
import './Game.css';

class Game extends Component {
  render() {
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
                callback: () => console.log('Checkpoint A'),
              },
            ] }
          >
            {() => (
              <Timer.Seconds />
            )}
          </Timer>
        </div>
      </div>
    );
  }
}

export default Game;
