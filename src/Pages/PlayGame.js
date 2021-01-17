import React, { Component } from 'react';
import Header from '../Components/Header';
import Questions from '../Components/Questions';
import Timer from '../Components/Timer';
import PlayAgain from '../Components/PlayAgain';

class PlayGame extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
        <Timer />
        <PlayAgain />
      </div>
    );
  }
}

export default PlayGame;
