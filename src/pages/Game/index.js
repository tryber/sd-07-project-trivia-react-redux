import React, { Component } from 'react';
import { Answer, Header, Question,  Next, Timer } from '../../components';
import './style.css';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
        <Question />
        <Answer />
        <Next />
      </div>
    );
  }
}

export default Game;