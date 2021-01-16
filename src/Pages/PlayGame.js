import React, { Component } from 'react';
import Header from '../Components/Header';
import Timer from '../Components/Timer';
import PlayAgain from '../Components/PlayAgain';

class PlayGame extends Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
        <PlayAgain />
      </div>
    );
  }
}

export default PlayGame;
