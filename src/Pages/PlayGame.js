import React, { Component } from 'react';
import Header from '../Components/Header';
import Questions from '../Components/Questions';
import Timer from '../Components/Timer';

class PlayGame extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
        <Timer />
      </div>
    );
  }
}

export default PlayGame;
