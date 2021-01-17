import React, { Component } from 'react';
import Header from '../Components/Header';
import Timer from '../Components/Timer';

class PlayGame extends Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
      </div>
    );
  }
}

export default PlayGame;
