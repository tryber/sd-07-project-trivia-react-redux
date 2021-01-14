import React, { Component } from 'react';
import Header from '../../components/Header';
import Questions from './Questions';
import Timer from './Timer';
// import Score from './Score';
import './index.css';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
        <Timer />
        {/* <Score /> */}
      </div>
    );
  }
}

export default Game;
