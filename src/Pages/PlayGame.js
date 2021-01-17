import React, { Component } from 'react';
import Header from '../Components/Header';
import Questions from '../Components/Questions';

class PlayGame extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default PlayGame;
