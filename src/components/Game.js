import React, { Component } from 'react';
import Timer from 'react-compound-timer';
// https://www.npmjs.com/package/react-compound-timer
import GridQuestions from './GridQuestions';
import Header from './Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GridQuestions />
        <Timer initialTime={ 30000 } direction="backward">
          {() => (
            <Timer.Seconds />)}
        </Timer>
      </div>
    );
  }
}

export default Game;
