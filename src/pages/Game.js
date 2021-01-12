import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  // componentDidMount() {
  //   this.getPlayerProfile();
  // }

  getPlayerProfile() {
    return JSON.parse(localStorage.getItem('state'));
    // console.log(playerProfile);
  }

  render() {
    return (
      <Header playerProfile={ this.getPlayerProfile() } />
    );
  }
}

export default Game;
